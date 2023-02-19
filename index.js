const express=require("express");
const parser=require("body-parser");
require("dotenv").config();
const {connection}=require("./configs/db");
const {blogsRouter}=require("./routes/blogs.route");
const {userRouter}=require("./routes/users.route");
const {authenticate}= require("./middlewares/authenticate");
const app=express();

app.use(parser.json());

app.use("/users",userRouter);

app.use(authenticate);
app.use("/blogs",blogsRouter);



app.listen(process.env.port,async()=>{

    try{
        await connection;
        console.log("DB connected successfully.")
    }
    catch(err){
        console.log(err);
    }
    console.log(`Server running on port: ${process.env.port}`)
})
