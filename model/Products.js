const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    countInStock: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
    shop: {
        shopID: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model('Product', productsSchema)