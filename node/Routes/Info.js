const { Router } = require('express');
const router = Router();
const infoControllers = require('../Controllers/infoController');


router.post('/addHotels', infoControllers.addHotels);

module.exports = router;