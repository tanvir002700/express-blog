const { validationResult } = require('express-validator/check');

module.exports.validationCheckForCreate = function(req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('posts/new', { csrfToken: req.csrfToken(), errors: errors.array() });
    } else {
      next();
    }
};

module.exports.validationCheckForUpdate = function(req, res, next) {
    var errors = validationResult(req);
    const id = req.params.id;
    if(!errors.isEmpty()) {
        Post.findById(id, function(err, post) {
            if(err) {
                res.render('/'+id+'/edit');
            } else {
                res.render('posts/edit', {post: post.rows[0], csrfToken: req.csrfToken(), errors: errors.array()});
            }
        });
    } else {
      next();
    }
};
