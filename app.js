const express = require('express');
const app = express();
require('dotenv').config();


const port = process.env.port || 5000


// welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Application!');
});


app.listen(port, () => {
    console.log(`server started listening on the Port: ${port}`);
});



