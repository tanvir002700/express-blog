var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

router.post('/create', function(req, res, next) {

    User.find_by_email(req.body.email, function(err, result) {
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
    res.render('users/login', { csrfToken: req.csrfToken() });
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.find_by_username(username, function(err, result) {
        if(err) throw err;
        if(!result.rows.legth == 0) {
            return done(null, false, { message: 'Unknown User' });
        }
        user = result.rows[0];
        User.compare_password(password, user.password, function(err, isMatch) {
            if(err) throw err;
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid Password' });
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.find_by_id(id, function(err, result) {
        done(err, result.rows[0]);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
