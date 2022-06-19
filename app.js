const express = require('express');
const connectDB = require('./config/db_config');
const app = express();
require('dotenv').config();
const port = process.env.port || 5000

// connect with Database
connectDB();

// view Engine EJS template config
app.set('view engine', 'ejs');

// import all routes
const authRoutes = require('./routers/auth');


// Route Middlewares
app.use('/auth', authRoutes);

// welcome route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`server started listening on the Port: ${port}`);
});



