// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

var corsOptions = {
  credentials: false
};

// Make socket io available to all the routers
app.use(cors(corsOptions), function(req, res, next){
  next();
});
// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// route our app
var router = require('./app/routes');
app.use('/', router);
app.use('/3d', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});

