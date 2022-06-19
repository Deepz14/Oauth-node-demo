const passport = require('passport');
const User = require('../models/user');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, next) => {
    User.findOne({email: profile._json.email})
    .then(user => {
        if(user){
            console.log('User is already exists in Database', user);
            next(null, user);
        }
        else{
            // store a data into the database;
            User.create({
                name: profile.displayName,
                email: profile._json.email,
                googleId: profile.id
            })
            .then(user => {
                console.log('user', user);
                next(null, user);
            })
            .catch(err =>  {
                console.log('Db error', err);
                next(null, user);
            })
        }
    })
    .catch(err => {
        console.log('Error', err);
        next(null, user);
    });
  }
));
