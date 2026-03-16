const mongoose = require('mongoose')

const solarDataSchema = new mongoose.Schema({
  // Which client this solar data belongs to
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },

  // Current month stats
  energyGenerated: { type: Number, default: 0 },   // kWh
  energySentToGrid: { type: Number, default: 0 },  // kWh
  moneyEarned: { type: Number, default: 0 },       // ₹
  co2Saved: { type: Number, default: 0 },          // tons
  homePoweredPercent: { type: Number, default: 0 },// %

  // Monthly history for charts
  monthlyData: [{
    month: String,         // e.g. "Jan 2025"
    generated: Number,
    sentToGrid: Number,
    earned: Number
  }],

  // Rate per unit (set by government)
  gridRate: { type: Number, default: 4.00 }        // ₹ per kWh

}, { timestamps: true })

module.exports = mongoose.model('SolarData', solarDataSchema)



/*
```

---

## ✅ Your Backend Models Are Now Complete!
```
backend/src/
├── models/
│   ├── user.js          ✅ User schema
│   ├── Application.js   ✅ Solar application schema
│   └── SolarData.js     ✅ Solar energy data schema
├── middleware/
│   └── authMiddleware.js ✅ JWT protection
├── controllers/
│   └── authController.js ✅ Login & Register
├── routes/
│   └── authRoutes.js    ✅ Auth endpoints
├── config/
│   └── db.js            ✅ MongoDB connection
└── server.js            ✅ Main server
```

---
*/