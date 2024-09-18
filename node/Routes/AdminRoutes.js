const { Router } = require('express');
const router = Router();
const adminAuthcontrollers = require('../Controllers/adminAuthController');

router.post('/signin', adminAuthcontrollers.signin_post);

router.post('/login', adminAuthcontrollers.login_post);

module.exports = router;