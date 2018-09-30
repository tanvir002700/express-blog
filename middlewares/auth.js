const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const passwordMatchingCallback = (err, isMatch) => {
  if (err) throw err;
  if (isMatch) {
    return this.done(null, this.user);
  }
  return this.done(null, false, { message: 'Invalid Password' });
};

const authenticationCallback = (err, result) => {
  const that = this;
  if (err) throw err;
  if (!result.rows.length) {
    return that.done(null, false, { message: 'Unknown User' });
  }
  [this.user] = result.rows;
  this.done = that.done;
  return bcrypt.compare(that.password, this.user.password, passwordMatchingCallback.bind(this));
};

passport.use(new LocalStrategy((username, password, done) => {
  this.password = password;
  this.done = done;
  User.findByUsername(username, authenticationCallback.bind(this));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, result) => {
    done(err, result.rows[0]);
  });
});

module.exports.passport = passport;

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('users/login');
};
