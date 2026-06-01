const mongoose=require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // OTP System
    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // Optional (future use)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone:{
      type:String,

    },
    Address:{
      type:String,
    },
     profilePicture:{
      type:Buffer,
     },
     

    products:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);