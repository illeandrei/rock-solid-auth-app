const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//on save hook
//before saving a model, run this function
userSchema.pre("save", function(next) {
  const user = this;

  //generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    //hash (encrypt) our password using th salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plain password with encrypted password
      user.password = hash;
      next();
    });
  });
});

//create the model class
const ModelClass = mongoose.model("user", userSchema);

//export the model
module.exports = ModelClass;
