const express = require('express');
const router = express.Router();

router.get('/new', function(req, res, next) {
    res.render('users/new', { csrfToken: req.csrfToken() });
});

router.post('/create', function(req, res, next) {
    console.log('create user');
    res.redirect('/');
});

module.exports = router;
