var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middlewares/auth');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

const checkDuplicateUserByEmail = function(req, res, next) {
  User.findByEmail(req.body.email, function(err, result) {
    if(result.rows.length || err) {
      req.flash('error', 'User already exist with this email.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

const checkDuplicateUserByUserName = function(req, res, next) {
  User.findByUsername(req.body.username, function(err, result) {
    if(result.rows.length || err) {
      req.flash('error', 'User already exist with this username.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

const checkPasswordConfirmation = function(req, res, next) {
  if(req.body.password === req.body.password_confirmation) {
    next();
  } else {
    req.flash('error', 'Password not Match.');
    res.render('users/new', { csrfToken: req.csrfToken() });
  }
};

router.post('/create', checkDuplicateUserByEmail, checkDuplicateUserByUserName, checkPasswordConfirmation, function(req, res, next) {
  User.create(req.body, function(err, result) {
      res.redirect('/');
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
