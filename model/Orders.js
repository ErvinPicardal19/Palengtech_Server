const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
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
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
});

module.exports = mongoose.model('Order', ordersSchema)