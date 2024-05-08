const mongoose = require('mongoose');
const carSchema = require('../schemes/carSchema');
const carAvaible = require('../schemes/carAvaible');
const personSchema = require('../schemes/personSchema');
const Person = mongoose.model('Person', personSchema);
const CarAvaible = mongoose.model('carAvaible', carAvaible);
const Car = mongoose.model('Car', carSchema);
const path = require('path');

const handleSearchSubmission = async (req, res) => {
    let { brand, model } = req.query;

    brand = brand.toLowerCase();
    model = model.toLowerCase();

    try {
        const carExists = await CarAvaible.exists({ brand, model });

        if (carExists) {
            const cars = await Car.find({ brand, model });

            res.render(`${brand}-${model}`, { car: cars[0], cars: cars, newCar: cars[0] });
        } else {
            res.send(`The car "${brand} ${model}" was not found in the database.`);
        }
    } catch (error) {
        console.error('Error searching for a car:', error);
        res.status(500).send('An error occurred while searching for a car.');
    }
};

const handleCarBrandModelSubmission = async (req, res) => {
    let { brand, model } = req.params;

    brand = brand.toLowerCase();
    model = model.toLowerCase();

    try {
        const carInfo = await Car.findOne({ brand: brand, model: model });

        if (carInfo) {
            res.render(`${brand}-${model}`, { car: carInfo, cars: [], newCar: carInfo });
        } else {
            res.send(`The car "${brand} ${model}"  was not found in the database.`);
        }
    } catch (error) {
        console.error('Error requesting car information:', error);
        res.status(500).send('An error occurred while searching for car information.');
    }
};



const handlereadMoreSubmission = async (req, res) => {
    let { brand, model, title } = req.params;

    brand = brand.toLowerCase();
    model = model.toLowerCase();
    title = title.toLowerCase();


    try {
        const carInfo = await Car.findOne({ brand: brand, model: model, title: title });

        if (carInfo) {
            res.render(`${brand}-${model}-${title}`, { car: carInfo });
        } else {
            res.send("Error: Car not found.");
        }
    } catch (error) {
        console.error('Error fetching car information:', error);
        res.status(500).send('Internal Server Error');
    }
};

const carDetailsHandler = (req, res) => {
    const model = req.params.model;
    const filePath = path.join(__dirname, '..', '..', 'car details html', `${model}.html`);
    res.sendFile(filePath);
};

const adminHandler = (req, res) => {
    res.render('admin');
};

const adminAddHandler = (req, res) => {
    res.render('addCar');
};

const getPeopleHandler = async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


const getCarsHandler = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getCarsTitle = async (req, res) => {
    try {
        const carsTitle = await Car.find({}, 'title');
        res.json(carsTitle);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    handleSearchSubmission,
    handleCarBrandModelSubmission,
    handlereadMoreSubmission,
    carDetailsHandler,
    adminHandler,
    adminAddHandler,
    getPeopleHandler,
    getCarsHandler,
    getCarsTitle
};