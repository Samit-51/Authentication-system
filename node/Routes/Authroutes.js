const { Router } = require('express');
const router = Router();
const Authcontrollers = require('../Controllers/authController');

router.post('/signin', Authcontrollers.signin_post);

router.post('/login', Authcontrollers.login_post);

router.post('/check-token', Authcontrollers.verifyToken);

module.exports = router;