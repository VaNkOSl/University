const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    brand:String,
    model:String,
    year:Number,
    fuelType:String,
    power:Number,
    euroStandard:String,
    engineCapacity:Number,
    transmission:String,
    category:String,
    mileage:Number,
    color:String
  });

module.exports = carSchema;