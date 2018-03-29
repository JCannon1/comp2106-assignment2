// reference mongoose
const mongoose = require('mongoose');

// create the car schema
const grocerySchema = new mongoose.Schema({
    colour: {
        type: String,
        required: 'Colour is required'
    },
    category: {
        type: String,
        required: 'Category is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    calories: {
        type: String,
        required: 'Calories are required'
    }
});

// make it public
module.exports = mongoose.model('Grocery', grocerySchema);