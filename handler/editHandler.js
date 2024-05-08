const mongoose = require('mongoose');
const carSchema = require('../schemes/carSchema');
const Car = mongoose.model('Car', carSchema);

const carsEdit = async (req,res) => {
    let carId = req.params.id;
    const { brand, model, title, price, year, power, euroStandard, 
    engineCapacity, transmission, category, mileage, color, fuelType } = req.body;

    try {
        const updatedFields = {};
        if (brand) updatedFields.brand = brand;
        if (model) updatedFields.model = model;
        if (title) updatedFields.title = title;
        if (price) updatedFields.price = price;
        if (year) updatedFields.year = year;
        if (power) updatedFields.power = power;
        if (euroStandard) updatedFields.euroStandard = euroStandard;
        if (engineCapacity) updatedFields.engineCapacity = engineCapacity;
        if (transmission) updatedFields.transmission = transmission;
        if (category) updatedFields.category = category;
        if (mileage) updatedFields.mileage = mileage;
        if (color) updatedFields.color = color;
        if (fuelType) updatedFields.fuelType = fuelType;

        const updatedCar = await Car.findByIdAndUpdate(carId, updatedFields, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json(updatedCar);
        carId = await Car.findByIdAndDelete(carId);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
     carsEdit
}