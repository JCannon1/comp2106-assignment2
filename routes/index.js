var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Grocery List Manager',
    message: 'the grocery list manager'
   });
});

/* GET groceries page. */
router.get('/groceries', function(req, res, next) {
  res.render('groceries', { 
    title: 'Grocery List',
    message: 'the list of available groceries'
   });
});

/* GET manager page. */
router.get('/manager', function(req, res, next) {
  res.render('manager', { 
    title: 'Grocery Manager',
    message: 'the Grocery Manager'
   });
});

// GET: /register
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register',
      user: req.user
  });
});

// GET: /login
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login',
      user: req.user
  });
});

module.exports = router;
