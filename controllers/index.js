const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth.isLoggedIn, (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/posts', auth.isLoggedIn, require('./posts_controller'));
router.use('/users', require('./users_controller'));

module.exports = router;
