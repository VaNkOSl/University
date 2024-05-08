const mongoose = require('mongoose');
const carSchema = require('../schemes/carSchema');
const Car = mongoose.model('Car', carSchema);


const deleteCarsHandler = async(req,res) => {
    try{
        const id = req.params.id;
        await Car.findByIdAndDelete(id);
        res.send("The vehicle was successfully deleted.");
    }catch(error){
        res.status(500).send(error);
    }
};

module.exports = {deleteCarsHandler};
