const express = require('express');
const router = express.Router();

router.get('/new', function(req, res, next) {
    res.send('create new post');
});

module.exports = router;
