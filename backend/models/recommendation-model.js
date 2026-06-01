const mongoose=require("mongoose");

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  viewedProducts: [String],
  purchasedProducts: [String],
  categories: [String],
}, { timestamps: true });

module.exports=mongoose.model("user",recommendationSchema);