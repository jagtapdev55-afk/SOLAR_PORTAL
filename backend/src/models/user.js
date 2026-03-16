const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define what a User looks like in the database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,        // Must be provided
    trim: true             // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,          // No two users with same email
    lowercase: true        // Always store as lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['client', 'government'],   // Only these two roles allowed
    default: 'client'
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  isApproved: {
    type: Boolean,
    default: false         // Client starts as not approved
  }
}, {
  timestamps: true         // Auto adds createdAt and updatedAt
})

// Before saving user — encrypt the password automatically
userSchema.pre('save', async function(next) {
  // Only encrypt if password was changed
  if (!this.isModified('password')) return next()

  // Encrypt password with strength of 10
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Method to check if entered password is correct
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)