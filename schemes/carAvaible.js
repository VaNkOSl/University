const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand:String,
    model:String,
  });

module.exports = carSchema;