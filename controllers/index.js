var express = require('express');
var router = express.Router();

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('users/login');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/posts', isLoggedIn, require('./posts_controller'));
router.use('/users', require('./users_controller'));

module.exports = router;
