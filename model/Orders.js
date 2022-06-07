const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isDelivered: {
        type: Boolean,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    payment: {
        paymentOption: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: Number,
            required: true,
        }
    },
    total: {
        type: Number,
        required: true,
    },
    user: {
        userID: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model('Order', ordersSchema)