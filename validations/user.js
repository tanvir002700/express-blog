const { check } = require('express-validator/check');

module.export.registrationValidations = [
  check('email').not().isEmpty(),
  check('username').not().isEmpty(),
];

module.export.loginValidations = [
  check('username').not().isEmpty(),
  check('password').not().isEmpty(),
  check('password_confirmation').not().isEmpty()
];
