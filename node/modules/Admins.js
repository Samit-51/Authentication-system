const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check }  = require('email-existence');

const admin = new mongoose.Schema({
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
  },
  Secret: {
  type: String,
  required: [true, 'Please enter the secret key.'],
  validate: {
    validator: function(value) {
      if (!value) return true;
      return value === '12se45gh';
    },
    message: 'Invalid secret key.'
  }
}
});

admin.pre('save', async function(next){
  this.Password = await bcrypt.hash(this.Password, 10);
  this.Secret = await bcrypt.hash(this.Secret, 10);
  next();
});

admin.statics.login= async function(email, password, secret){
    const admin = await this.findOne({Email: email});
    if(admin){
      const auth = await bcrypt.compare(password, admin.Password);
      if(auth){
        if(secret==='12se45gh'){
          return admin;
        }else{
          throw { Path:'Secret', message: 'Incorrect secret key.'}
        }
      }
      throw { Path:'Password', message: 'Incorrect password.'}
    } else {
    throw {Path:'Email', message: 'Incorrect email.'}
    }
}
module.exports = mongoose.model('admins', admin);