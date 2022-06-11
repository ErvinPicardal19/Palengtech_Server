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
        default: false,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
});

module.exports = mongoose.model('Product', productsSchema)