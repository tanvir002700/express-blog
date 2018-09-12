const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const test_helper = require('../helpers/test_helper');

router.get('/', auth.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/posts', auth.isLoggedIn, require('./posts_controller'));
router.use('/users', require('./users_controller'));

module.exports = router;
