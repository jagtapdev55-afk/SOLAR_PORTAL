const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Protect route — check if user is logged in
const protect = async (req, res, next) => {
  let token

  // Check if token exists in request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (removes "Bearer " part)
      token = req.headers.authorization.split(' ')[1]

      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Find user from token and attach to request
      req.user = await User.findById(decoded.id).select('-password')

      next() // Continue to the actual route

    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

// Government only route — check if user is government officer
const governmentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'government') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied — Government only' })
  }
}

// Client only route
const clientOnly = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied — Clients only' })
  }
}

module.exports = { protect, governmentOnly, clientOnly }