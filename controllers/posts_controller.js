const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', function(req, res, next) {
    Post.all(null, function(){}, function(posts) {
        res.render('posts/index', {posts: posts.rows})
    });
});

router.get('/new', function(req, res, next) {
    res.render('posts/new');
});

router.post('/create', function(req, res, next) {
    Post.create(req.body, function(){}, function(){
        res.redirect('/posts');
    });
});


module.exports = router;
