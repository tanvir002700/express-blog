const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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

passport.use(new LocalStrategy(function(email, password, done) {
    User.find_by_email(email, function(err, result) {
        if(err) throw err;
        if(result.rows.legth) {
            return done(null, false, { message: 'Unknown User' });
        }
        user = result.rows[0];
        console.log(user);
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

module.exports = router;
