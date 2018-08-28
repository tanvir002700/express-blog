const { validationResult } = require('express-validator/check');

module.exports.validationCheckForRegistration = function(req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('users/new', { csrfToken: req.csrfToken(), errors: errors.array() });
    } else {
      next();
    }
};
