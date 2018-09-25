const express = require('express');
const Post = require('../models/post');
const { validations } = require('../validations/post');
const { validationCheckForCreate, validationCheckForUpdate } = require('../middlewares/post');

const router = express.Router();


router.get('/', (req, res) => {
  Post.all(null, (err, posts) => {
    if (err) {
      res.redirect('/');
    } else {
      res.render('posts/index', { posts: posts.rows, csrfToken: req.csrfToken() });
    }
  });
});

router.get('/new', (req, res) => {
  res.render('posts/new', { csrfToken: req.csrfToken() });
});

router.post('/create', validations, validationCheckForCreate, (req, res) => {
  Post.create(req.body, (err, result) => {
    if (err) {
      res.render('posts/new', { csrfToken: req.csrfToken() });
    } else if (result) {
      res.redirect('/posts');
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) {
      res.render('/');
    } else {
      res.render('posts/show', { post: post.rows[0] });
    }
  });
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) {
      res.render(`/${id}/edit`);
    } else {
      res.render('posts/edit', { post: post.rows[0], csrfToken: req.csrfToken() });
    }
  });
});

router.put('/:id/update', validations, validationCheckForUpdate, (req, res) => {
  const { id } = req.params;
  Post.update(id, req.body, (err, result) => {
    if (err) {
      res.render(`/${id}/edit`);
    } else if (result) {
      res.redirect('/posts');
    }
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Post.delete(id, (err, result) => {
    if (err) {
      res.redirect('/posts');
    } else if (result) {
      res.redirect('/posts');
    }
  });
});

module.exports = router;
