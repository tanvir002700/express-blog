const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const Post = require('../models/post');
const { validations } = require('../validations/post');
const { validationCheckForCreate, validationCheckForUpdate } = require('../middlewares/post');


router.get('/', function(req, res, next) {
    Post.all(null, function(err, posts) {
        if(err) {
            res.redirect('/');
        } else {
            res.render('posts/index', {posts: posts.rows, csrfToken: req.csrfToken()})
        }
    });
});

router.get('/new', function(req, res, next) {
    res.render('posts/new', { csrfToken: req.csrfToken() });
});

router.post('/create', validations, validationCheckForCreate, function(req, res, next) {
    Post.create(req.body, function(err, result) {
        if(err) {
            res.render('posts/new', { csrfToken: req.csrfToken() });
        } else {
            res.redirect('/posts');
        }
    });
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) {
            res.render('/');
        } else {
            res.render('posts/show', {post: post.rows[0]});
        }
    });
});

router.get('/:id/edit', function(req, res, next) {
    const id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) {
            res.render('/'+id+'/edit');
        } else {
            res.render('posts/edit', {post: post.rows[0], csrfToken: req.csrfToken()});
        }
    });
});

router.put('/:id/update', validations, validationCheckForUpdate, function(req, res, next) {
    const id = req.params.id;
    Post.update(id, req.body, function(err, result) {
        if(err) {
            res.render('/'+id+'/edit');
        } else {
            res.redirect('/posts');
            return;
        }
    });
});


router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    Post.delete(id, function(err, result) {
        if(err) {
            res.redirect('/posts');
        } else {
            res.redirect('/posts');
        }
    });
});

module.exports = router;
