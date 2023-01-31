const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

passport.use(new localStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
        if(err) { return cb(err); }
        if(!row) { return cb(null, false, { message: 'Incorrect username or password.'});
    }
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if(err) {return cb(err);}
        if(!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb(null, false, {message: 'Incorrect username or password.'});
        }
        return cb(null, row);
    });
    });
}));

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login'
}));

module.exports = router