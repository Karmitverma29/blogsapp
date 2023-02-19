const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {Users} =require("../models/users.model");
const userRouter=express.Router();


userRouter.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    
    try{
        bcrypt.hash(password,5,async(err, hash)=>{

            if(err) console.log({"err":err.message})
            else{
                const User=new Users({name,email,password:hash});
                await User.save();
                res.send({"msg":"New User has been registered."});
            }
        });
      
    }
    catch(err){
        res.send({"msg":"Something is wrong.","error":err});
    }
    
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
       
        const user=await Users.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai");
                    res.send({"msg":"Login Successful.","token":token})

                }

            });

        }
        else{
            res.send({"msg":"Wrong Creds."})

        }
    }
    catch(err){
        res.send({"msg":"Something is wrong","error":err.message});
    }

})

module.exports={
    userRouter
}