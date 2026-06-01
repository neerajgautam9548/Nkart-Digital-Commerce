const mongoose=require("mongoose");

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  messages: [
    {
      role: String, // "user" or "bot"
      content: String,
    }
  ],
}, { timestamps: true });

module.exports=mongoose.model("user",chatSchema);