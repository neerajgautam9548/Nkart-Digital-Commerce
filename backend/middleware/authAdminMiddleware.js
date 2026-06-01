const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");

const authAdminMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token;


        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Forbidden: Admins only",
            });
        }
        const adminModel = userModel.findOne({ _id: req.user._id });
        if (!adminModel) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        next();

    } catch (err) {

        return res.status(401).json({ message: "Invalid token" });
    }
}


module.exports = authAdminMiddleware;