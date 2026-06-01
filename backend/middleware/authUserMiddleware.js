const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");

const authUserMiddleware = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;
        // console.log(token);
        
        
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // console.log(decoded);
        
        next();
        
    } catch (err) {
        console.log("authUserMiddleware is running");


        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authUserMiddleware;