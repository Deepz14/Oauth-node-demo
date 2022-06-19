const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    googleId: {
        type: String,
        required: [true, 'Please provide a googleId']
    }

});

module.exports = mongoose.model('User', userSchema);