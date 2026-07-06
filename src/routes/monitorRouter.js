const express = require('express');
const router = express.Router();
const {welcomeMessage, registerMonitor, heartbeat} = require('../controllers/monitorController.js');

router.get('/', welcomeMessage);
router.post('/register', registerMonitor);
router.post('/:id/heartbeat', heartbeat);


module.exports = router;