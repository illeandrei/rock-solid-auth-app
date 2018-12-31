const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

//create a passport middleware
//that uses jwt and does NOT create a cookie based session
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hello: "logged in successfully" });
  });
  app.post("/signup", Authentication.signup);
};
