const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('signup/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile/profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;