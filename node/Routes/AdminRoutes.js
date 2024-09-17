const { Router } = require('express');
const router = Router();
const Authcontrollers = require('../Controllers/adminAuthController');

router.post('/admin/signin', adminAuthController.signin_post);

router.post('/admin/login', adminAuthController.login_post);

module.exports = router;