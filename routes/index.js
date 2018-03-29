var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Grocery List Manager',
    message: 'the grocery list manager'
   });
});

/* GET groceries page. */
router.get('/groceries', (req, res, next) => {
  res.render('groceries', { 
    title: 'Grocery List',
    message: 'the list of available groceries'
   });
});

/* GET manager page. */
router.get('/manager', (req, res, next) => {
  res.render('manager', { 
    title: 'Grocery Manager',
    message: 'the Grocery Manager'
   });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { 
    title: 'About Page',
    message: 'the about page'
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

// GET: /google
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// GET: /google/callback
// router.get('/google/callback', passport.authenticate('google', {
  // failed google auth
//   failureRedirect: '/login',
//   failureMessage: 'Invalid Login',
//   scope: 'email'
// }),
  // successful google auth
//   (req, res, next) => {
//      res.redirect('/cars');
//   }
// );

module.exports = router;
