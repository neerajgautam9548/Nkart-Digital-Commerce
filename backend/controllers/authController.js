const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const { verifiedUsers } = require("../routes/reqOtp");


module.exports.RegisterAuth = async (req, res) => {
    try {

        let { firstname, lastname, email, password } = req.body;
        //res.send(name);
        // console.log(firstname + " " + lastname + " " + email + " " + password);
        let user = await userModel.findOne({ email });
        // console.log(verifiedUsers[email]);
        // console.log(verifiedUsers);
        // console.log(user);
        if (user) {
            // console.log("yes")
            req.flash("error", "Email already exists");
            return res.status(400).json({
                message: "Email already exists",
                flashMessage: req.flash("error"),
            });
        }
        if (!verifiedUsers[email]) {
            // console.log("yes 1")
            req.flash("error", "Please verify OTP first");
            return res.status(400).json({
                message: "Please verify OTP first",
                flashMessage: req.flash("error"),
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        // if (err) {
        //     return res.status(503).send(err.message);
        // }
        let createdUser = await userModel.create({
            firstName: firstname,
            lastName: lastname,
            email,
            password: hash,
            isVerified: true,

        });
        delete verifiedUsers[email];
        // res.send(createdUser);

        let token = generateToken(createdUser);
        res.cookie("token", token);

        req.flash("success", "Register successfully"); 
        return res.status(200).json({
            message: "Register successfully",
            flashMessage: req.flash("success"),
        });


    } catch (err) {
        req.flash("error", "An error occurred during registration");
        // console.error("ERROR:", err.message); // 🔥 log actual error
        return res.status(500).json({
            message: "Server error",
            error: err.message,
            flashMessage: req.flash("error"),
        });
    }

}



module.exports.LoginAuth = async (req, res) => {
    try {

        let { email, password, role } = req.body;
        // console.log(email + " " + password + " " + role);
        let user = await userModel.findOne({ email });
        if (!user) {
            // console.log("yes error occur email");

            return res.status(401).json({
                message: "This Email is not registered",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log("yes error occur password");

            return res.status(401).json({
                message: "password is incorrect",
            });
        }

        let token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        req.flash("success", "Login successfully");
        return res.status(200).json({
            message: "Login Successfully",
            flashMessage: req.flash("success"),


        })

    } catch (err) {
        // console.error(err);
        // console.log("yes error occur");
        req.flash("error", "An error occurred during login");
        return res.status(500).json({
            message: "Server error",
            error: err.message,
            flashMessage: req.flash("error"),
        });
    }
}

module.exports.LogoutAuth = async (req, res) => {
    // console.log("logout route is running");

    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
    });

    req.flash("success", "You have been logged out");

    return res.status(200).json({
        message: "Logout successful",
        flashMessage: req.flash("success"),
    });
};

module.exports.ForgotPassword = async (req, res) => {
    try {
        // console.log("chal raha hai");
        let { email, password } = req.body;

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let updatePassword = await userModel.findOneAndUpdate(
            { email: email },
            { password: hash },
            { new: true },
        );
        req.flash("success", "Password updated successfully");
        return res.status(200).send({
            message: "Password updated Successfully",
            flashMessage: req.flash("success"),
        })
    } catch (err) {
        req.flash("error", "An error occurred while updating password");
        return res.status(500).json({
            message: "Server Error",
            error: err.message,
            flashMessage: req.flash("error"),
        })
    }
}

// module.exports=router;
