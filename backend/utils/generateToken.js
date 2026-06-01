const jwt=require("jsonwebtoken");
require("dotenv");

module.exports.generateToken = function(user){
   
    return jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET_KEY);
}