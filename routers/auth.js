const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }),
    (req, res) => {
        res.send('login with google');
    }
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        console.log('callback', req.user);
        res.send('google callback');
    }
);

module.exports = router;