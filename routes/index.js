const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.user) {return res.render('home');}
    next();
}, function(req, res, next) {
    res.locals.filter = null;
    res.render('index', {user: req.user});
});

module.exports = router;