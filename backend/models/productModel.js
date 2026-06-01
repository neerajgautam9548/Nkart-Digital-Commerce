const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice:Number,
  category: String,
  brand: String,
  color:String,
  stock: Number,
  images: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  users:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ]
}, { timestamps: true });



module.exports=mongoose.model("products",productSchema);