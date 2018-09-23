const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const { registrationValidations } = require('../validations/user');
const {
  validationCheckForRegistration,
  checkDuplicateUserByEmail,
  checkDuplicateUserByUserName,
  checkPasswordConfirmation,
} = require('../middlewares/user');

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('users/new', { csrfToken: req.csrfToken() });
});


router.post('/create',
  registrationValidations,
  validationCheckForRegistration,
  checkDuplicateUserByEmail,
  checkDuplicateUserByUserName,
  checkPasswordConfirmation,
  (req, res) => {
    User.create(req.body, (err, result) => {
      if (result) res.redirect('/');
    });
  });

router.get('/login', (req, res) => {
  res.render('users/login', { csrfToken: req.csrfToken() });
});

router.post('/login',
  auth.passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
