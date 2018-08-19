var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middlewares/auth');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

router.post('/create', function(req, res, next) {

    User.find_by_email(req.body.email, function(err, result) {
        if(result.rows.length || err) {
            req.flash('error', 'User already exist.');
            res.redirect('/');
        } else {
            console.log(req.body.password);
            console.log(req.body.password_confirmation);
            if(req.body.password === req.body.password_confirmation) {
                User.create(req.body, function(err, result) {
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Password not Match.');
                res.render('users/new', { csrfToken: req.csrfToken() });
            }
        }
    });
});

router.get('/login', function(req, res, next) {
    res.render('users/login', { csrfToken: req.csrfToken() });
});


router.post('/login',
    auth.passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
});

router.get('/logout', function (req, res) {
	req.logout();

    req.flash('success', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;
