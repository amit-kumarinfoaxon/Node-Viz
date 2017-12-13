// require express
var express = require('express');
var path    = require('path');
var cors    = require('cors');
// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage

router.route('/').get(cors(), function(req, res) {
  var users = [
    { name: 'Apoorv', email: 'apoorv.gupta@infoaxon.com', avatar: 'https://google.com'}
  ];
  res.render('layout3d.ejs', { users: users });
});

router.route('/3d').get(cors(), function(req, res) {
  
  console.log("m i call ")
});


