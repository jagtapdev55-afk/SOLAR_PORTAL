const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  // Which client submitted this application
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           // Links to User model
    required: true
  },

  // Personal details
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // Property details
  monthlyBill: { type: Number, required: true },
  roofArea: { type: Number, required: true },
  numberOfPanels: { type: Number, required: true },
  systemCapacity: { type: String },

  // Documents uploaded (URLs from Cloudinary)
  documents: [{
    name: String,          // e.g. "ID Proof"
    url: String            // Cloudinary URL
  }],

  // Application status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Government officer's comment on approval/rejection
  officerComment: {
    type: String,
    default: ''
  },

  // Which officer reviewed this
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  reviewedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)