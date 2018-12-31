const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/user");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  //see if the user already exists
  User.findOne({ email: email }, function(err, existingUser) {
    //yes -> display error
    if (err) {
      return next(err);
    }

    if (existingUser) {
      res.status(422).send({ error: "Email is in use" });
    }

    //no -> create and save new user
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      //respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  //user has already been auth'd
  //we just need to give them a token
  //user model is assign by passport to req.user
  res.json({ token: tokenForUser(req.user) });
};
