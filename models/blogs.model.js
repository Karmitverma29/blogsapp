const mongoose=require("mongoose");

const BlogsSchema=new mongoose.Schema({
  image:String,
  topic:String,
  description:String,
  user:String

  
});

const Blogs=mongoose.model("Blogs",BlogsSchema);

module.exports={
    Blogs
}