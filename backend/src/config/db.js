const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Connect to MongoDB using URL from .env
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`❌ Error: ${error.message}`)
    process.exit(1) // Stop the server if DB connection fails
  }
}

module.exports = connectDB