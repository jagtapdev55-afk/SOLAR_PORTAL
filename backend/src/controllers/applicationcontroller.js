const Application = require('../models/applications')
const SolarData = require('../models/solardata')

// --------------------------------
// SUBMIT APPLICATION — POST /api/applications
// --------------------------------
const submitApplication = async (req, res) => {
  try {
    const { name, phone, address, monthlyBill, roofArea, numberOfPanels } = req.body

    // Check if client already has an application
    const existing = await Application.findOne({ client: req.user._id })
    if (existing) {
      return res.status(400).json({ message: 'You already have an application submitted' })
    }

    // Calculate system capacity from number of panels
    const systemCapacity = `${(numberOfPanels * 0.45).toFixed(1)} kW`

    // Create application
    const application = await Application.create({
      client: req.user._id,
      name, phone, address,
      monthlyBill, roofArea,
      numberOfPanels, systemCapacity,
      email: req.user.email
    })

    res.status(201).json(application)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------
// GET MY APPLICATION — GET /api/applications/my
// --------------------------------
const getMyApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ client: req.user._id })

    if (!application) {
      return res.status(404).json({ message: 'No application found' })
    }

    res.json(application)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------
// GET ALL APPLICATIONS — GET /api/applications/all
// (Government only)
// --------------------------------
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .sort({ createdAt: -1 }) // newest first

    res.json(applications)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------
// UPDATE APPLICATION STATUS — PUT /api/applications/:id
// (Government only)
// --------------------------------
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, officerComment } = req.body

    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    // Update status
    application.status = status
    application.officerComment = officerComment || ''
    application.reviewedBy = req.user._id
    application.reviewedAt = new Date()

    await application.save()

    // If approved — create solar data record for this client
    if (status === 'approved') {
      const existingSolar = await SolarData.findOne({ client: application.client })

      if (!existingSolar) {
        await SolarData.create({
          client: application.client,
          application: application._id,
          energyGenerated: 0,
          energySentToGrid: 0,
          moneyEarned: 0,
          co2Saved: 0,
          homePoweredPercent: 0,
          monthlyData: []
        })
      }
    }

    res.json({ message: `Application ${status} successfully`, application })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  submitApplication,
  getMyApplication,
  getAllApplications,
  updateApplicationStatus
}