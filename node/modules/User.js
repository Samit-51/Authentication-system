const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check }  = require('email-existence');

const user = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, 'Please enter a username.'],
    unique: true
  },
  Email: {
    type: String,
    required: [true, 'Please enter a email.'],
    unique: true,
    validate: {
      validator: function(value) {
        return new Promise((resolve, reject) => {
          check(value, (err, exists) => {
            if (err || !exists) {
              reject(new Error('Email must be valid.'));
            } else {
              resolve(true);
            }
          });
        });
      },
      message: 'Email must be valid.'
    }
  },
  Password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minlength: [8, 'Password must be at least 8 characters long.']
  }
});
user.pre('save', async function(next){
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});
user.statics.login= async function(email, password){
    const User = await this.findOne({Email: email});
    if(User){
      const auth = await bcrypt.compare(password, User.Password);
      if(auth){
        return User;
      }
      throw { Path:'Password', message: 'Incorrect password.'}
    } else {
    throw {Path:'Email', message: 'Incorrect email.'}
    }
}
module.exports = mongoose.model('Users', user);