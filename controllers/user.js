// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'New user added to the oauth2 server!' });
  });
};

// Create endpoint /api/users for GET
exports.getUser = function(req, res) {
  User.find(function(err, returnedUser) {
    if (err)
      return res.send(err);

    console.log(returnedUser);
    var user = {};
    user.username = returnedUser[0].username;
    res.json(user);
  });
};