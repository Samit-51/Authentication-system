const { Router } = require('express');
const router = Router();
const Authcontrollers = require('../Controllers/adminAuthController');

router.post('/signin', adminAuthController.signin_post);

router.post('/login', adminAuthController.login_post);

module.exports = router;