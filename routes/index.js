var express = require('express');
var router = express.Router();

// auth references
const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Grocery List Manager',
    message: 'the grocery list manager',
    user: req.user
   });
});

/* GET groceries page. */
// router.get('/grocery', (req, res, next) => {
//   res.render('grocery', { 
//     title: 'Grocery List',
//     message: 'the list of available groceries'
//    });
// });


/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { 
    title: 'About Page',
    message: 'the about page',
    user: req.user
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Page',
    message: 'the contact page',
    user: req.user
   });
});

// GET: /register
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register',
      user: req.user
  });
});

// POST: /register
router.post('/register', (req, res, next) => {
  // create the new User with our model
    User.register(new User({
        username: req.body.username,
        phone: req.body.phone
    }), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        // automatically log the user in and direct to /groceries
          req.login(user,  (err) => {
            res.redirect('/groceries')
          })
          res.redirect('/login');
      }
    });
});

// GET: /login
router.get('/login', (req, res, next) => {
  // check for invalid login message in the session object
  let messages = req.session.messages || [];

  // clear the session messages
  req.session.messages = [];

  res.render('login', {
      title: 'Login',
      messages: messages,
      user: req.user
  });
});

// POST: /login
// router.post('/login', passport.authenticate('local', {
// successRedirect: '/groceries',
//   failureRedirect: '/login',
//   failureMessage: 'Invalid Login'
// }));

// GET: /logout
router.get('/logout', (req, res, next) => {

  // clear out any session messages
  req.session.messages = [];

  // end the user's session
  req.logout();

  // redirect to login or home
  res.redirect('/login');
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
//      res.redirect('/groceries');
//   }
// );

module.exports = router;
