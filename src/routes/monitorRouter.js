const express = require('express');
const router = express.Router();
const {welcomeMessage, registerMonitor, heartbeat, pauseMonitor} = require('../controllers/monitorController.js');

router.post('/', registerMonitor);
router.post('/:id/heartbeat', heartbeat);
router.post('/:id/pause', pauseMonitor);


module.exports = router;