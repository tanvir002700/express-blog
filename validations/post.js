const { check } = require('express-validator/check');

module.exports.validations = [
    check('title').not().isEmpty(),
    check('description').not().isEmpty()
];
