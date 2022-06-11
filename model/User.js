const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    refreshToken: String
})

module.exports = mongoose.model('User', usersSchema)