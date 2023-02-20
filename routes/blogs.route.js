const express = require('express');
const { Blogs } = require('../models/blogs.model');

const blogsRouter = express.Router();

blogsRouter.get('/getblogs', async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ error: 'Unable to fetch blogs' });
  }
});

blogsRouter.post('/create', async (req, res) => {
  const { image, topic, description } = req.body;

  try {
    const blog = new Blogs({ image, topic, description });
    await blog.save();
    res.status(201).send({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Unable to create blog' });
  }
});

module.exports = {
  blogsRouter
};
