const express = require('express')
const router = express.Router()
const {welcomeMessage, registerMonitor} = require('../controllers/monitorController.js')

router.get('/', welcomeMessage)
router.post('/register', registerMonitor)


module.exports = router;