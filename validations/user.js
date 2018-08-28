const { check } = require('express-validator/check');

module.exports.registrationValidations = [
  check('email').not().isEmpty().withMessage('Email should not be empty.').isEmail().withMessage('Is not Valid Email'),
  check('username').not().isEmpty(),
  check('password').not().isEmpty(),
  check('password_confirmation').not().isEmpty()
];

module.exports.loginValidations = [
  check('username').not().isEmpty(),
  check('password').not().isEmpty(),
];
