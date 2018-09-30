const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

module.exports.validationCheckForCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('posts/new', { csrfToken: req.csrfToken(), errors: errors.array() });
  } else {
    next();
  }
};

module.exports.validationCheckForUpdate = (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;
  if (!errors.isEmpty()) {
    Post.findById(id, (err, post) => {
      if (err) {
        res.render(`/id/${id}/edit`);
      } else {
        res.render('posts/edit', { post: post.rows[0], csrfToken: req.csrfToken(), errors: errors.array() });
      }
    });
  } else {
    next();
  }
};
