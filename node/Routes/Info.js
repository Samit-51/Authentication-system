const { Router } = require('express');
const router = Router();
const infoControllers = require('../Controllers/infoController');

router.post('/getHotels', infoControllers.getHotels);

router.post('/addHotels', infoControllers.addHotels);

module.exports = router;