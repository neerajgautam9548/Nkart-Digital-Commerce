  const express = require("express");
  const app = express();
  const path = require("path");
  const cors = require("cors");
  require("dotenv").config();
  const port = 3000;
  const connectDB = require("./config/db");
  const indexRouter = require("./routes/indexRoutes");
  const UserRouter = require("./routes/userRoutes");
  const ProductRouter = require("./routes/productRoutes");
  const userModel = require("./models/userModel");
  const cookieParser = require("cookie-parser");
  const authAdminMiddleware = require("./middleware/authAdminMiddleware");
  // const multer = require("multer");



  const Razorpay = require("razorpay");
  const authUserMiddleware = require("./middleware/authUserMiddleware");

  const expressSession = require("express-session");
  const flash = require("connect-flash");

  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.EXPRESS_SESSION_SECRET,   // move to env in production

    })
  );

  // flash AFTER session
  app.use(flash())

  app.set("view engine", " ejs");
app.use(
  cors({
    origin: [
      "https://neerajbazarstore.vercel.app",
      "https://neerajbazarstore-5q8i6kz8q-neerajs-projects-5fcf6ab9.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cookieParser());

  connectDB();
  // const admin = async (req,res) => {

  //     let user = await userModel.create({
  //         firstName:"neeraj",
  //         lastName:"gautam",
  //         email: "neeraj@gmail.com",
  //         password: "neeraj8126",
  //         role: "admin",
  //         isVerified:true,
  // });
  // }
  // admin();
  app.set("trust proxy", 1);

  // app.use("/",indexRouter);
  app.use("/users", UserRouter);
  app.use("/products", authUserMiddleware, ProductRouter);
  // const storage = multer.memoryStorage();

  // const upload = multer({
  //     storage
  // });

  // app.post("/upload",)
  app.post("/upload",  async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    // console.log(user);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.Address = req.body.address;
    
    await user.save();
    // console.log(user);
    // console.log("chal raha hai1");
    req.flash("success", "Profile updated successfully");
    res.status(200).json({ message: "Profile updated successfully",flashMessage: req.flash("success") });
  });

  app.get("/", authUserMiddleware, (req, res) => {
    req.flash("success", "Welcome to the Home page");
    res.status(200).json({ message: "home route is running", flashMessage: req.flash("success") });
  });
  app.get("/Cart", authUserMiddleware, (req, res) => {
    req.flash("success", "Welcome to the Cart page");

    res.status(200).json({ message: "cart route is running", flashMessage: req.flash("success") });
  })
  app.get("/profile", authUserMiddleware, (req, res) => {
    req.flash("success", "Welcome to the Profile page");
    res.status(200).json({ message: "profile route is running", flashMessage: req.flash("success") });
  })

  app.get("/AdminPanel", authAdminMiddleware, (req, res) => {
    req.flash("success", "Welcome to the Admin Panel");
    res.status(200).json({ message: "admin access granted", flashMessage: req.flash("success") });
  })

  // const razorpayInstance = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables
  //   key_secret: process.env.RAZORPAY_KEY_SECRET,
  // });


  // app.get("/createOrder", async (req, res) => {

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
  //     req.flash("success", "Order created successfully");
  //     res.status(200).json({
  //       success: true,
  //       order,
  //       flashMessage: req.flash("success")
  //     });

  //   } catch (error) {

  //     console.log("FULL ERROR:");
  //     console.log(error);

  //     console.log("MESSAGE:", error.message);
  //     req.flash("error", "Failed to create order");
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //       flashMessage: req.flash("error")
  //     });
  //   }
  // })


  app.listen(port, (req, res) => {
    console.log(`local host running on port : ${port}`);
  })
