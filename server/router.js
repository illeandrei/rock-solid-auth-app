const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

//create a passport middleware
//use jwt strategy and do NOT create a cookie based session
const requireAuth = passport.authenticate("jwt", { session: false });
//use local strategy and do NOT create a cookie based session
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hello: "logged in successfully" });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
