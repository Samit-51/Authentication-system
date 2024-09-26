const User = require('../modules/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { Username: '', Email: '', Password: ''};
  if (err.code === 11000) {
    if (Object.keys(err.keyPattern).includes('Email')) {
      errors.Email = 'Email already registered.';
    } else {
      errors.Username = 'Username already taken.';
    }
    return errors;
  }
  
  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
  
  return errors;
};

module.exports.signin_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      Username: username,
      Email: email,
      Password: password,
    });
    const token = jwt.sign({ Username: user.Username }, process.env.JWT_SECRET);
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 5});
    res.send('Verified')
  } catch (e) {
    const errors = handleErrors(e);
    res.send({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      const token = await jwt.sign({ Username: user.Username }, process.env.JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 1000 * 60 * 30 , httpOnly: true});
      res.send('Verified');
    } else {
      res.send({ errors: { Email: 'Invalid email or password' } });
    }
  } catch (e) {
    const errors = { Email: '', Password: '' };
    errors[e.Path] = e.message;
    res.send({ errors });
  }
};

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err,decoded)=>{
      if(err){
        res.send({ success: false, token: true});
      }else{
        const user = await User.findOne({Username: decoded.Username});
        res.send({success: true, token: true, user: user});
      }
    });
  } else {
    res.send({ token: false});
  }
};
