const express = require('express')
const router = express.Router()
const {
  getMySolarData,
  getClientSolarData,
  updateSolarData
} = require('../controllers/solarcontroller')

const { protect, governmentOnly, clientOnly } = require('../middleware/authMiddleware')

// Client — get own solar data
router.get('/my', protect, clientOnly, getMySolarData)

// Government — get any client solar data
router.get('/:clientId', protect, governmentOnly, getClientSolarData)

// Government — update client solar data
router.put('/:clientId', protect, governmentOnly, updateSolarData)

module.exports = router