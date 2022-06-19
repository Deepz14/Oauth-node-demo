const express = require('express');
const connectDB = require('./config/db_config');
const app = express();
const cookieSession  = require('cookie-session');
require('dotenv').config();
require('./passport/passport');
const passport = require('passport');
const { verifyUser } = require('./middleware/verifyuser');
const port = process.env.port || 5000

// connect with Database
connectDB();

// cookiesession
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: [process.env.COOKIE_SECRET_KEY]
}));

//Passport config
app.use(passport.initialize());
app.use(passport.session());

// view Engine EJS template config
app.set('view engine', 'ejs');

// import all routes
const authRoutes = require('./routers/auth');

// Route Middlewares
app.use('/auth', authRoutes);

// welcome route
app.get('/', verifyUser, (req, res) => {
    res.redirect('/home');
});

app.get('/home', verifyUser, (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`server started listening on the Port: ${port}`);
});



