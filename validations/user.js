const { check } = require('express-validator/check');

module.exports.registrationValidations = [
  check('email').not()
    .isEmpty()
    .withMessage('Email should not be empty.')
    .isEmail()
    .withMessage('Is not Valid Email'),
  check('username').not().isEmpty()
    .withMessage('User should not be empty.'),
  check('password').not().isEmpty()
    .withMessage('Password should not be empty.'),
  check('password_confirmation').not()
    .isEmpty().withMessage('password confirmation should not be empty.'),
];

module.exports.loginValidations = [
  check('username').not()
    .isEmpty()
    .withMessage('username should not empty.'),
  check('password').not()
    .isEmpty()
    .withMessage('password should not empty.'),
];
