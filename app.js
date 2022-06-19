const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port || 5000


// view Engine EJS template config
app.set('view engine', 'ejs');

// welcome route
app.get('/', (req, res) => {
    res.render('home');
});


app.listen(port, () => {
    console.log(`server started listening on the Port: ${port}`);
});



