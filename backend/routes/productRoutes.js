const express = require("express");
const { createTransport } = require("nodemailer");
const router = express.Router();
const createProduct = require("../controllers/productController");
const productModel = require("../models/productModel");

const Razorpay = require("razorpay");
require("dotenv").config();
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authUserMiddleware = require("../middleware/authUserMiddleware");
const userModel = require("../models/userModel");

// const Razorpay = require("razorpay");
// const authUserMiddleware = require("./middleware/authUserMiddleware");


router.get("/createOrder", async (req, res) => {

    try {

        console.log("Route hit");

        const amount = 1;

        // console.log("Amount:", amount);

        // console.log("Razorpay Instance:", razorpayInstance);

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: "INR",
            receipt: "receipt_order_1",
        };

        // console.log("Options:", options);

        const order = await razorpayInstance.orders.create(options);

        console.log("Order:", order);
        req.flash("success", "Order created successfully");
        res.setHeader(
            "Access-Control-Expose-Headers",
            "request-id,x-rtb-fingerprint-id"
        );
        res.status(200).json({
            success: true,
            order,
            flashMessage: req.flash("success")
        });

    } catch (error) {

        // console.log("FULL ERROR:");
        // console.log(error);

        console.log("MESSAGE:", error.message);
        req.flash("error", "Failed to create order");
        res.status(500).json({
            success: false,
            message: error.message,
            flashMessage: req.flash("error")
        });
    }
})
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



router.get("/", authUserMiddleware, (req, res) => {
    req.flash("success", "Welcome to the Products page");
    res.json({
        message: "product created",
        flashMessage: req.flash("success")

    })
})

router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
    const user = await userModel.findById(req.user.id);
    user.products.pull(productId);
    await user.save();
    req.flash("success", "Product removed from cart successfully");
    res.status(200).json({ message: "product removed from the cart", flashMessage: req.flash("success") });
});

router.post("/addCart", async (req, res) => {
    try {
        const { productId } = req.body;

        // Check product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user
        const user = await userModel.findById(req.user.id);

        // Check if product already exists in cart
        if (user.products.includes(productId)) {
            return res.status(409).json({
                message: "Product already exists in cart"
            });
        }

        // Add product
        user.products.push(productId);
        await user.save();

        req.flash("success", "Product added to cart successfully");

        res.status(200).json({
            message: "Product added successfully to the cart",
            flashMessage: req.flash("success")
        });

    } catch (err) {
        req.flash("error", "Failed to add product to cart");

        res.status(500).json({
            message: "Internal server error",
            data: err.message,
            flashMessage: req.flash("error")
        });
    }
});

router.get("/cart", async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate("products");
        req.flash("success", "Products fetched successfully from cart");
        res.status(200).json({ message: "user products get successfully", products: user.products, flashMessage: req.flash("success") });
    } catch (err) {
        req.flash("error", "Failed to get products in cart");
        res.status(500).json({ message: "internal server error", data: err.message, flashMessage: req.flash("error") });
    }
})

router.get("/all", async (req, res) => {
    try {
        const products = await productModel.find();
        req.flash("success", "Products fetched successfully");
        res.json({ success: true, data: products, flashMessage: req.flash("success") });
    } catch (err) {
        req.flash("error", "Failed to fetch products");
        res.status(500).json({
            success: false,
            flashMessage: req.flash("error")
        })
    }
})
router.get("/:id", async (req, res) => {
    try {

        const product = await productModel.findOne({ _id: req.params.id });
        // console.log(product);
        res.json({ sucess: true, data: product });
    } catch (err) {
        res.status(500).json({ success: true });
    }

})


router.put("/edit/:id", async (req, res) => {
    // console.log("chal raha hai");
    try {
        
        
        
        let { productname, productdescription, category, stock, saleprice, originalprice, productimage, color, rating, review } = req.body;
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                
                name: productname,
                description: productdescription,
                price: Number(saleprice),
                originalPrice: Number(originalprice),
                category: category,
                stock: Number(stock),
                images: [productimage],
                color: color,
                rating: Number(rating),
                numReviews: Number(review),
            },
            { returnDocument: "after" }
            
        );
        req.flash("success", "Product updated successfully");
        res.json({
            success: true,
            data: product,
            flashMessage: req.flash("success")
        })
    } catch (err) {
        console.log("chal raha hai");
        // console.log(error);
        // req.flash("error", "Failed to update product");
        res.status(500).json({
            success: false,
            message: "update Failed",
            flashMessage: req.flash("error")
        })
    }

})
router.post("/delete/:id", authAdminMiddleware, async (req, res) => {
    try {

        // console.log("chal raha hai");
        // console.log(req.params.id);
        await productModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            success: true,
            message: "product deleted",
            flashMessage: req.flash("success")
        })

    } catch (err) {
        // console.log(error);
        // req.flash("error", "Failed to delete product");
        res.status(500).json({
            success: false,
            message: "deletion failed",
            reason: err.message,
            flashMessage: req.flash("error"),
        })
    }



})


// console.log(process.env.RAZORPAY_KEY_ID);
// console.log(process.env.RAZORPAY_KEY_SECRET);

// router.post("/create-order",async (req,res)=>{
//     console.log("chal raha hai");
//     try {
//         console.log(req.body.amount);
//         const options = {
//             amount: req.body.amount * 100,
//             currency: "INR",
//             receipt: "receipt_order_1",
//         };

//         console.log("yes yahi error ha");
//         const order = await razorpayInstance.orders.create(options);

//     // ✅ SEND RESPONSE
//     res.json({
//       success: true,
//       order
//     });

//   } catch (error) {
//     console.log("yes error");
//     res.status(500).send(error);
//   }
// })


// router.get("/createOrder", async (req, res) => {

//   try {

//     console.log("Route hit");

//     const amount = 1;

//     console.log("Amount:", amount);

//     console.log("Razorpay Instance:", razorpayInstance);

//     const options = {
//       amount: Math.round(Number(amount) * 100),
//       currency: "INR",
//       receipt: "receipt_order_1",
//     };

//     console.log("Options:", options);

//     const order = await razorpayInstance.orders.create(options);

//     console.log("Order:", order);
//     req.flash("success","Order created successfully");
//     res.status(200).json({
//       success: true,
//       order,
//         flashMessage: req.flash("success"),
//     });

//   } catch (error) {

//   console.log("FULL ERROR:");
//   console.log(error);

//   console.log("MESSAGE:", error.message);
//     req.flash("error","Failed to create order");
//   res.status(500).json({
//     success: false,
//     message: error.message,
//     flashMessage: req.flash("error"),
//   });
// }
// });
router.post("/create", authAdminMiddleware, createProduct);

// router.post("/create", async (req,res) =>{
//     console.log("chal raha hai");
// })



module.exports = router;