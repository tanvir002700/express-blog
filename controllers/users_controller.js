const express = require('express');
const router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

module.exports = router;
