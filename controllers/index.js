var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', auth.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/posts', auth.isLoggedIn, require('./posts_controller'));
router.use('/users', require('./users_controller'));

module.exports = router;
