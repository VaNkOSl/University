const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 1000
    }
});

module.exports = reviewsSchema;