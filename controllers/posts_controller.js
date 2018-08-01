const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', function(req, res, next) {
    Post.all(null, function(err, posts) {
        if(err) {
            res.redirect('/');
        } else {
            console.log('Came to index posts.........');
            res.render('posts/index', {posts: posts.rows})
        }
    });
});

router.get('/new', function(req, res, next) {
    res.render('posts/new');
});

router.post('/create', function(req, res, next) {
    Post.create(req.body, function(err, result) {
        if(err) {
            res.render('/new');
        } else {
            res.redirect('/posts');
        }
    });
});

router.get('/:id/edit', function(req, res, next) {
    const id = req.params.id;
    Post.find_by_id(id, function(err, post) {
        if(err) {
            res.render('/'+id+'/edit');
        } else {
            res.render('posts/edit', {post: post.rows[0]});
        }
    });
});

router.put('/:id/update', function(req, res, next) {
    console.log('came here.........');
    const id = req.params.id;
    console.log(id);
    Post.update(id, req.body, function(err, result) {
        if(err) {
            res.render('/'+id+'/edit');
        } else {
            console.log('success update................');
            console.log(err);
            console.log(result);
            res.redirect('/posts');
            return;
        }
    });
});


module.exports = router;
