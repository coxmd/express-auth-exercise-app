const express = require('express');
const db = require('../db');

const router = express.Router();

// get the index page
router.get('/index', function(req, res, next) {
    res.locals.filter = null;
    res.render('index')
});

router.get('/', function(req, res, next) {
    res.render('home')
});

module.exports = router;