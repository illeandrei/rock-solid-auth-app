const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//passport-jwt is library for authenticating
//a user using the jwt strategy

//create local strategy (email & password) to use at signin
//setup options for local strategy
const localOptions = { usernameField: "email" }; //look at the email property as username

//create local strategy
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      done(null, false);
    }

    //compare passwords - is `password` === user.password
    user.comparePasswords(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        done(null, false);
      } else {
        done(null, user);
      }
    });
  });
});

//setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //payload - is the decrypted token

  //see if the userId in the payload exists in the db
  //if it does, call done with that user
  //if not, cal done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
