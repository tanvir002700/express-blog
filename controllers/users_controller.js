var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middlewares/auth');
const { registrationValidations } = require('../validations/user');
const {
  validationCheckForRegistration,
  checkDuplicateUserByEmail,
  checkDuplicateUserByUserName,
  checkPasswordConfirmation
} = require('../middlewares/user');

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});


router.post('/create', registrationValidations, validationCheckForRegistration, checkDuplicateUserByEmail, checkDuplicateUserByUserName, checkPasswordConfirmation, function(req, res, next) {
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
