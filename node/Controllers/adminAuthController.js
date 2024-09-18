const Admin = require('../modules/Admins');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { Username: '', Email: '', Password: '', Secret: ''};
  if (err.code === 11000) {
    if (Object.keys(err.keyPattern).includes('Email')) {
      errors.Email = 'Email already registered.';
    } else {
      errors.Username = 'Username already taken.';
    }
    return errors;
  }
  
  if (err.message.includes('admins validation failed')) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
  return errors;
};

module.exports.signin_post = async (req, res) => {
  const { username, email, password , secret} = req.body;
  try {
    const admin = await Admin.create({
      Username: username,
      Email: email,
      Password: password,
      Secret : secret
    });
    res.send('Verified');
  } catch (e) {
    const errors = handleErrors(e);
    res.send({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password , secret} = req.body;
  try {
    const admin = await Admin.login(email, password, secret);
    res.send('Verified');
  } catch (e) {
    const errors = { Email: '', Password: '' };
    errors[e.Path] = e.message;
    res.send({ errors });
  }
};
