const express = require('express');
const router = express.Router();
const {welcomeMessage, registerMonitor, heartbeat, pauseMonitor} = require('../controllers/monitorController.js');

router.get('/', welcomeMessage);
router.post('/register', registerMonitor);
router.post('/:id/heartbeat', heartbeat);
router.post('/:id/pause', pauseMonitor);


module.exports = router;