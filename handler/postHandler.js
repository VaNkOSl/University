const mongoose = require('mongoose');
const questionSchema = require('../schemes/questionSchema');
const personSchema = require('../schemes/personSchema');
const schemaUser = require('../schemes/userSchema');
const schemaReviews = require('../schemes/reviewSchema');
const Review = mongoose.model('Review', schemaReviews);
const User = mongoose.model('User', schemaUser);
const Person = mongoose.model('Person', personSchema);
const Questions = mongoose.model('Questions', questionSchema);
const carSchema = require('../schemes/carSchema');
const Car = mongoose.model('Car', carSchema);


const handleCarAddition = async (req, res) => {
    let { title, price,   brand, model,
        year, fuelType, power, euroStandard, engineCapacity,
        transmission, category, mileage, color } = req.body;
        
    if (!req.file) {
        return res.status(400).send('Error: No file selected for upload.');
    }

    let image = '/uploads/' + req.file.filename;

    brand = brand.toLowerCase();
    model = model.toLowerCase();
    try {
        const newCar = new Car({
            title, price, image,
            brand, model, year, fuelType, power, euroStandard,
            engineCapacity, transmission, category, mileage, color
        });
        await newCar.save();

        const cars = await Car.find({ brand, model });

        res.render(`${brand}-${model}`, { car: newCar, cars: cars, newCar: newCar });
    } catch (error) {
        console.error('Грешка при добавяне на кола:', error);
        res.status(500).send('Възникна грешка при добавяне на кола.');
    }
};

const handleHelpSubmission = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Please fill in all fields.');
    }
    try {
        const newQuestion = new Questions({
            name,
            email,
            message
        });

        const savedQuestions = await newQuestion.save();
        console.log('Contact saved successfully:', savedQuestions);
        res.send(`Data submitted successfully. Name: ${name}, Email: ${email}, Message: ${message}`);
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).send('Error saving contact');
    }
};

const handlePersonSubmission = async (req, res) => {
    const { name, address, product } = req.body;

    if (!name || !address) {
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        const newPerson = new Person({
            name,
            address,
            product
        });

        const savedPerson = await newPerson.save();
        console.log('Contact saved successfully:', savedPerson);
        res.send(`Data submitted successfully. Name: ${name}, Address: ${address}.`);
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).send('Error saving contact');
    }
};

const handleRegisterSubmission = async (req, res) => {
    const { username, password } = req.body;

    try {

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send("Username already exists!❌");
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.send("User registered successfully!✅");
    } catch (error) {
        res.status(500).send("Registration failed!❌");
    }
};

const handleLoginSubmission = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username === 'admin' && password === 'admin123') {
            return res.redirect('./admin');
        } else {
            const user = await User.findOne({ username, password });

            if (user) {
                return res.send("Successfully logged in!✅");
            }else{
                return res.send('User not found!❌')
            }
        }
    } catch (error) {
        res.status(500).send("Login failed!❌");
    }
}

const handleReviewsSubmission = async (req, res) => {
    const commentText = req.body.comment;

    try {
        const newReviews = new Review({
            comment: commentText
        });

        const savedReview = await newReviews.save();
        console.log("Review saved successfully:", savedReview);
        res.send("Review saved successfully");

    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).send("Error saving review");
    }
};

module.exports = {
    handleHelpSubmission, handlePersonSubmission,
    handleRegisterSubmission, handleLoginSubmission,
    handleReviewsSubmission, handleCarAddition
};