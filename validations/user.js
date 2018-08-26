const { check } = require('express-validator/check');

module.export.registrationValidations = [
  check('email').not.isEmpty(),
  check('username').not.isEmpty(),
];
