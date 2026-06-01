const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("index route is running");
})

module.exports=router;