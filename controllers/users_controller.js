const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

router.post('/create', function(req, res, next) {
    console.log('create user');
    User.create(req.body, function(err, result) {
        res.redirect('/');
    });
});

module.exports = router;
