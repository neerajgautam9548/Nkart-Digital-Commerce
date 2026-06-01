const mongoose=require("mongoose");

const ownerModel= mongoose.Schema({
    fullname:"String",
    email:String,
    password:{
        type:String,
        
    }
})
module.exports=mongoose.model("user",ownerModel);