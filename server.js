// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/oauth2server');

// Create the Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/user')
  .post(userController.postUser)
  .get(authController.isAuthenticated, userController.getUser);


// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server, listening at port 3333
app.listen(3333);
console.log("Available at localhost:3333")






