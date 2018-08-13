const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

router.post('/create', function(req, res, next) {

    User.find_by_email(req.body, function(err, result) {
        if(result.rows.length || err) {
            res.redirect('/');
        } else {
            User.create(req.body, function(err, result) {
                res.redirect('/');
            });
        }
    });
});

router.get('/login', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

module.exports = router;
