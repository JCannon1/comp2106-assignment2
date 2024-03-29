const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    'colour': {
        type: String,
        required: 'Colour is required'
    },
    'category': {
        type: String,
        required: 'Category is required'
    },
    'price': {
        type: Number,
        required: 'Price is Required'
    },
    'calories': {
        type: Number,
        required: 'Calories are Required'
    }
});

module.exports = mongoose.model('Grocery', grocerySchema);