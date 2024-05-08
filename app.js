const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка за обсужване на статични файлове

app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/javascript', express.static(path.join(__dirname, '..', 'javascript')));
app.use('/cardetailscss', express.static(path.join(__dirname, '..', 'cardetailscss')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use(express.static(path.join(__dirname, '..', 'html')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/CarsDataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDb connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

const { handleHelpSubmission, handlePersonSubmission,
    handleRegisterSubmission, handleLoginSubmission,
    handleReviewsSubmission, handleCarAddition } = require('./handler/postHandler');

app.post('/submitquestion', handleHelpSubmission);
app.post('/submit-form', handlePersonSubmission);
app.post('/register', handleRegisterSubmission);
app.post('/login', handleLoginSubmission);
app.post('/reviews-form', handleReviewsSubmission);
app.post('/admin/add', upload.single('image'), handleCarAddition);



const { handleSearchSubmission, handleCarBrandModelSubmission,
    handlereadMoreSubmission, carDetailsHandler,
    adminHandler,
    adminAddHandler, getPeopleHandler,
    getCarsHandler, getCarsTitle } = require('./handler/getHandler');

app.get('/search', handleSearchSubmission);
app.get('/cars/:brand/:model', handleCarBrandModelSubmission);
app.get('/readmore/:brand/:model/:title', handlereadMoreSubmission);
app.get('/car-details/:model', carDetailsHandler);
 app.get('/admin', adminHandler);
 app.get('/admin/add', adminAddHandler);
app.get('/get-people', getPeopleHandler);
 app.get('/get-cars', getCarsHandler);
app.get('/car-titles', getCarsTitle);

const { deleteCarsHandler } = require('./handler/deleteHandler');

app.delete('/delete-car/:id', deleteCarsHandler);

const {carsEdit} = require('./handler/editHandler');

app.put('/carsEdit/:id',carsEdit);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('views', [
    path.join(__dirname, 'cars'),
    path.join(__dirname, 'cars', 'audi'),
    path.join(__dirname, 'cars','bmw'),
    path.join(__dirname, 'cars','mercedes'),
    path.join(__dirname, 'cars','volkswagen'),
    path.join(__dirname, 'cars','toyota'),
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'readmore')
]);

const carSchema = require('../server/schemes/carSchema');
const Car = mongoose.model('Car', carSchema);

// app.put('/carsEdit/:id', async (req, res) => {
//     let carId = req.params.id;
//     const { brand, model, title, price, year, power, euroStandard, engineCapacity, transmission, category, mileage, color, fuelType } = req.body;

//     try {
//         const updatedFields = {};
//         if (brand) updatedFields.brand = brand;
//         if (model) updatedFields.model = model;
//         if (title) updatedFields.title = title;
//         if (price) updatedFields.price = price;
//         if (year) updatedFields.year = year;
//         if (power) updatedFields.power = power;
//         if (euroStandard) updatedFields.euroStandard = euroStandard;
//         if (engineCapacity) updatedFields.engineCapacity = engineCapacity;
//         if (transmission) updatedFields.transmission = transmission;
//         if (category) updatedFields.category = category;
//         if (mileage) updatedFields.mileage = mileage;
//         if (color) updatedFields.color = color;
//         if (fuelType) updatedFields.fuelType = fuelType;

//         const updatedCar = await Car.findByIdAndUpdate(carId, updatedFields, { new: true });

//         if (!updatedCar) {
//             return res.status(404).json({ message: 'Car not found' });
//         }

//         res.json(updatedCar);
//         carId = await Car.findByIdAndDelete(carId);
//     } catch (error) {
//         console.error('Error updating car:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
