const express=require("express");
const router=express.Router();
const productModel=require("../models/productModel");

// const createProduct = async (req,res) => {
//         const { productname,productdescription,category,stock,saleprice,originalprice,productimage,color,rating,review } = req.body;
//         const product={productname,productdescription,category,stock,saleprice,originalprice,productimage,color,rating,review};
//         console.log(product);
//         const products=await productModel.create({
//            name:  productname,
//            description:productdescription,
//            category:category,
//            stock:stock,
//            price:saleprice,
//            originalPrice:originalprice,
//            images:productimage,
//            color:color,
//            rating:rating,
//            numReviews:review
//         })
//         console.log(products);
//         res.json({ success: true });
// }

const createProduct = async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      category,
      stock,
      saleprice,
      originalprice,
      productimage,
      color,
      rating,
      review
    } = req.body;

    const product = {
      productname,
      productdescription,
      category,
      stock,
      saleprice,
      originalprice,
      productimage,
      color,
      rating,
      review
    };

    // console.log(product);

    const savedProduct = await productModel.create({
      name: productname,
      description: productdescription,
      category: category,
      stock: stock,
      price: saleprice,
      originalPrice: originalprice,
      images: productimage,
      color: color,
      rating: rating,
      numReviews: review
    });

    // console.log(savedProduct);
    req.flash("success", "Product created successfully");
    res.status(201).json({
      success: true,
      data: savedProduct,
      flashMessage: req.flash("success")
    });

  } catch (error) {
    // console.error(error);
    req.flash("error", "Product creation failed");

    res.status(500).json({
      success: false,
      message: "Product creation failed",
      flashMessage: req.flash("error"),
    });
  }
};

module.exports=createProduct;