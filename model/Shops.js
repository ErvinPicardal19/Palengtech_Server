const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopsSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        categoryID: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model('Shop', shopsSchema)