const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },                          // Data stored inside token
    process.env.JWT_SECRET,                // Secret key from .env
    { expiresIn: '7d' }                    // Token expires in 7 days
  )
}

// --------------------------------
// REGISTER — POST /api/auth/register
// --------------------------------
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user in database
    const user = await User.create({
      name, email, password, role, phone, address
    })

    // Send back user data + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// --------------------------------
// LOGIN — POST /api/auth/login
// --------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Send back user data + token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login }