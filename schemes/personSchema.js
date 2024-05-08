const mongoose = require('mongoose');

const schemaPerson = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        validate: {
            validator: function (v) {
                return /^[\p{L}\s]+$/u.test(v);
            },
            message: 'Името трябва да съдържа само букви и интервали!',
        },
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    product: {
        type: String,
    }
});

module.exports = schemaPerson;