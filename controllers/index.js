var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/posts', require('./posts_controller'))
router.use('/users', require('./users_controller'))

module.exports = router;
