const nodemailer = require("nodemailer");

const verifiedUsers = {};
const otpCache = {};


// OTP generator
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,      // SMTP Login
    pass: process.env.EMAIL_PASSWORD,  // SMTP Key
  },
});
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);


const sendOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `
    <h2>OTP Verification</h2>
    <h1>${otp}</h1>
    <p>This OTP is valid for 5 minutes.</p>
  `
    });

    console.log("MAIL SENT:", info.messageId);
    console.log("ACCEPTED:", info.accepted);
    console.log("RESPONSE:", info.response);

    return info;
  } catch (err) {
    console.error("MAIL ERROR:", err);
    throw err;
  }
};

// =======================
// SEND OTP
// =======================

const reqotp = async (req, res) => {
  // console.log("chal raha hai");
  const { email } = req.body;
  if (!email) {
    req.flash("error", "Email is required");
    return res.status(400).json({
      message: "Email is required",
      flashMessage: req.flash("error"),
    });
  }
  // console.log(email);
  const otp = generateOTP();
  otpCache[email] = {
    otp,
    expire: Date.now() + 5 * 60 * 1000, // 5 min

  }
  // res.send(email);
  // console.log(otpCache);
  try {
    console.log("Sending OTP to:", email);
    console.log("OTP:", otp);

    await sendOTP(email, otp);

    console.log("OTP sent successfully");
    req.flash("success", "OTP sent successfully");

    return res.status(200).json({ ...otpCache[email], message: "OTP sent successfully", flashMessage: req.flash("success") });


  } catch (error) {
    req.flash("error", "Failed to send OTP");
    // catch (error) {
    console.log("OTP ERROR:", error);
    return res.status(500).json({
      message: "Failed to send OTP",
      flashMessage: req.flash("error")
    });
  }
};

// =======================
// VERIFY OTP
// =======================
const verifyotp = async (req, res) => {
  // console.log("chal raha hai")
  const { email, otp } = req.body;
  if (!otpCache[email]) {
    req.flash("error", "OTP not found");
    return res.status(400).json({ message: "OTP not found", flashMessage: req.flash("error") });
  }

  if (otpCache[email].expire < Date.now()) {
    delete otpCache[email];
    req.flash("error", "OTP expired");
    return res.status(400).json({ message: "OTP expired", flashMessage: req.flash("error") });
  }

  if (otpCache[email].otp === otp.trim()) {
    delete otpCache[email];
    verifiedUsers[email] = true;

    req.flash("success", "OTP verified successfully");
    return res.status(200).json({
      message: "OTP verified",
      success: true,
      flashMessage: req.flash("success"),
    });
  }

  req.flash("error", "Invalid OTP");
  return res.status(400).json({ message: "Invalid OTP", flashMessage: req.flash("error") })
};

module.exports = {
  reqotp,
  verifyotp,
  verifiedUsers,
  otpCache
};