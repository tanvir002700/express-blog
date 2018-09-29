const { validationResult } = require('express-validator/check');
const User = require('../models/user');

module.exports.validationCheckForRegistration = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('users/new', { csrfToken: req.csrfToken(), errors: errors.array() });
  } else {
    next();
  }
};

module.exports.checkDuplicateUserByEmail = (req, res, next) => {
  User.findByEmail(req.body.email, (err, result) => {
    if (result.rows.length || err) {
      req.flash('error', 'User already exist with this email.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

module.exports.checkDuplicateUserByUserName = (req, res, next) => {
  User.findByUsername(req.body.username, (err, result) => {
    if (result.rows.length || err) {
      req.flash('error', 'User already exist with this username.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

module.exports.checkPasswordConfirmation = (req, res, next) => {
  if (req.body.password === req.body.password_confirmation) {
    next();
  } else {
    req.flash('error', 'Password not Match.');
    res.render('users/new', { csrfToken: req.csrfToken() });
  }
};
