const express=require('express');
const {Blogs} =require("../models/blogs.model");
const blogsRouter=express.Router();

blogsRouter.get("/getblogs",async(req,res)=>{

    try{
    
        let Blog=await Blogs.find();
        res.send(Blog);
    }
    catch(err){
        res.send({"err":err.message});
    }
    
    })



blogsRouter.post("/create",async(req,res)=>{

    const{image,topic,description}=req.body;
try{

    let Blog=new Blogs({image,topic,description});
    await Blog.save();
    res.send({"msg":"Blog Created Successfully."})
}
catch(err){
    res.send({"err":err.message});
}

})



module.exports={
    blogsRouter
}