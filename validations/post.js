const { check } = require('express-validator/check');

module.exports.validations = [
  check('title').not()
  .isEmpty().
  withMessage('Title should not be empty.'),
  check('description').not()
  .isEmpty()
  .withMessage('Description should not be empty.'),
];
