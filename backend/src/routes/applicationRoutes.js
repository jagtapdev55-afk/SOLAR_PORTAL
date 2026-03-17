const express = require('express')
const router = express.Router()
const {
  submitApplication,
  getMyApplication,
  getAllApplications,
  updateApplicationStatus
} = require('../controllers/applicationcontroller')

const { protect, governmentOnly, clientOnly } = require('../middleware/authMiddleware')

// Client routes
router.post('/', protect, clientOnly, submitApplication)
router.get('/my', protect, clientOnly, getMyApplication)

// Government routes
router.get('/all', protect, governmentOnly, getAllApplications)
router.put('/:id', protect, governmentOnly, updateApplicationStatus)

module.exports = router