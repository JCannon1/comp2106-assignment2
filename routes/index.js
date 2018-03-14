var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Grocery List Manager',
    message: 'the grocery list manager'
   });
});

module.exports = router;
