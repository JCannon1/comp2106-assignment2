// references
const express = require('express');
const router = express.Router();
const Grocery = require('../models/grocery');

// access auth check method in our new global functions file
const functions = require('../config/functions');

// GET: /groceries
router.get('/', (req, res, next) => {
    // get grocery documents from db
    Grocery.find((err, grocery) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('groceries/index', {
                title: 'Grocery List',
                grocery: grocery,
                user: req.user
            });
        }
    });
});

// GET: /groceries/add
router.get('/add', functions.isLoggedIn, (req, res, next) => {
    res.render('groceries/add', {
        title: 'Add a New Food Item',
        user: req.user
    });
});

// POST: /groceries/add
router.post('/add', functions.isLoggedIn, (req, res, next) => {
    // use the groceries route to save the new food item
    Grocery.create({
        colour: req.body.colour,
        category: req.body.category,
        price: req.body.price,
        calories: req.body.calories
    }, (err, grocery) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/groceries');
        }
    }) ;
});

// GET: /groceries/delete/abc123
router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Grocery model to delete the document with this id
    Grocery.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/groceries');
        }
    });
});

// GET: /grocery/edit/abc123
router.get('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    // get _id param from url
    let _id = req.params._id;

    // use the Grocery model to find the selected document
    Grocery.findById(_id, (err, grocery) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('groceries/edit', {
                title: 'Grocery Details',
                grocery: grocery,
                user: req.user
            });
        }
    });
});

// POST: /grocery/edit/abc123
router.post('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values
    Grocery.update({ _id: _id },
        { $set: {
                colour: req.body.colour,
                category: req.body.category,
                price: req.body.price,
                calories: req.body.calories
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/groceries');
            }
        });
});


// make public
module.exports = router;