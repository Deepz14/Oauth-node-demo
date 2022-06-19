const passport = require('passport');
const User = require('../models/user');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, next) => {
    User.findOne({email: profile._json.email})
    .then(user => {
        if(user){
            next(null, user);
            // cookie session
        }
        else{
            // store a data into the database;
            User.create({
                name: profile.displayName,
                email: profile._json.email,
                googleId: profile.id
            })
            .then(user => {
                next(null, user);
                // cookie session
            })
            .catch(err =>  {
                console.log('Db error', err);
            })
        }
    })
    .catch(err => {
        console.log('Error', err);
    });
  }
));
