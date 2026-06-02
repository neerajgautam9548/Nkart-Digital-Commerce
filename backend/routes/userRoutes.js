const express = require("express");
const router = express.Router();
const { RegisterAuth, LoginAuth, LogoutAuth, ForgotPassword } = require("../controllers/authController");
const { reqotp, verifyotp } = require("./reqOtp");
const userModel = require("../models/userModel");
const authUserMiddleware = require("../middleware/authUserMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage
});
// const RegisterAuth = require("../controllers/authController");
router.get("/", (req, res) => {
    
    res.send("user route is running");
})
router.post(
  "/updatepicture",
  authUserMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      
      if (!req.file) {
          return res.status(400).json({
              message: "Please select an image",
            });
        }
        // console.log(req.file);
        
        user.profilePicture = req.file.buffer;
        
        await user.save();
        
        // console.log("chal raha hai");
      res.status(200).json({
        message: "Profile picture uploaded successfully",
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
router.get("/profile-picture", authUserMiddleware, async (req, res) => {

    const user = await userModel.findById(req.user.id);

    if (!user.profilePicture) {
        return res.status(404).send("No image");
    }

    res.set("Content-Type", "image/jpeg");
    res.send(user.profilePicture);
});
router.get("/profile", authUserMiddleware, async (req, res) => {
    const user = await userModel.findById(req.user.id);

    res.json({
        image: user.profilePicture?.toString("base64")
    });
});
router.get("/Details", authUserMiddleware, (req, res) => {
    // console.log("user details route is running");
    // console.log(req.user.id);
    userModel.findById(req.user.id).then((user) => {
        res.status(200).json({ userData: user });
    })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching user details", error: err.message });
        })
})
router.post("/register", RegisterAuth);
router.post("/register/reqOTP", reqotp);
router.post("/register/verifyOTP", verifyotp);
router.post("/forgotpassword", ForgotPassword);
router.post("/login", LoginAuth);
router.get("/logout", LogoutAuth);


module.exports = router;