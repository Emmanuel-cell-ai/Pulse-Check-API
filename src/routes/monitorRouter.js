const express = require('express')
const router = express.Router()
const monitorController = require('../controllers/monitorController')


router.post("/register", monitorController.registerMonitor)