const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    }
  ],

  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },

  paymentMethod: String,
  totalPrice: Number,

  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
}, { timestamps: true });


module.exports=mongoose.model("user",orderSchema);