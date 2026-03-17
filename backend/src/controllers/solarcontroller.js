const SolarData = require('../models/solardata')
const Application = require('../models/applications')

// --------------------------------
// GET MY SOLAR DATA — GET /api/solar/my
// (Client)
// --------------------------------
const getMySolarData = async (req, res) => {
  try {
    const solarData = await SolarData.findOne({ client: req.user._id })

    if (!solarData) {
      return res.status(404).json({ message: 'No solar data found' })
    }

    res.json(solarData)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------
// GET CLIENT SOLAR DATA — GET /api/solar/:clientId
// (Government officer views any client's solar data)
// --------------------------------
const getClientSolarData = async (req, res) => {
  try {
    const solarData = await SolarData.findOne({ client: req.params.clientId })

    if (!solarData) {
      return res.status(404).json({ message: 'No solar data found for this client' })
    }

    res.json(solarData)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------
// UPDATE SOLAR DATA — PUT /api/solar/:clientId
// (In real app this comes from IoT device on solar panels)
// (For now government officer can manually update)
// --------------------------------
const updateSolarData = async (req, res) => {
  try {
    const {
      energyGenerated,
      energySentToGrid,
      co2Saved,
      homePoweredPercent,
      gridRate
    } = req.body

    const solarData = await SolarData.findOne({ client: req.params.clientId })

    if (!solarData) {
      return res.status(404).json({ message: 'Solar data not found' })
    }

    // Calculate money earned
    const rate = gridRate || solarData.gridRate || 4
    const moneyEarned = energySentToGrid * rate

    // Update current stats
    solarData.energyGenerated = energyGenerated
    solarData.energySentToGrid = energySentToGrid
    solarData.moneyEarned = moneyEarned
    solarData.co2Saved = co2Saved
    solarData.homePoweredPercent = homePoweredPercent
    solarData.gridRate = rate

    // Add to monthly history
    const currentMonth = new Date().toLocaleString('default', { month: 'short', year: 'numeric' })
    const existingMonth = solarData.monthlyData.find(m => m.month === currentMonth)

    if (existingMonth) {
      existingMonth.generated = energyGenerated
      existingMonth.sentToGrid = energySentToGrid
      existingMonth.earned = moneyEarned
    } else {
      solarData.monthlyData.push({
        month: currentMonth,
        generated: energyGenerated,
        sentToGrid: energySentToGrid,
        earned: moneyEarned
      })
    }

    await solarData.save()

    res.json({ message: 'Solar data updated', solarData })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getMySolarData, getClientSolarData, updateSolarData }