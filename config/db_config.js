const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(res => console.log(`DB is connected`))
    .catch(err => {
        console.log(`something went wrong unable to connect to DB`);
        console.log(err);
        process.exit(1);
    })
}


module.exports = connectDB;