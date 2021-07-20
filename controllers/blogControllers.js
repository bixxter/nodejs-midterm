const Blog = require('../models/blog');
const fs = require('fs');
const sharp = require('sharp');
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'All blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { blog: result, title: 'Blog detail' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog is not found.' });
    });
};
// const blog_create_get = (req, res) => {
//   res.render('blogs/create', { title: 'Create a new post' });
// };
const blog_create_post = async (req, res) => {
  // const base = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png();
  // const base64 = await base.toString('base64');
  // console.log(base64);
  const buffer = await sharp(req.file.buffer).resize({ width: 400, height: 400 }).png().toBuffer();
  let image = buffer.toString('base64');
  const post = {
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    image: image,
  };
  const blog = new Blog(post);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_delete_post = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: '/blogs' }))
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_details,
  //blog_create_get,
  blog_create_post,
  blog_delete_post,
};
