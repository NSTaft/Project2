// Import dependencies
 const mongoose = require('mongoose')

 // Define model

 // Pull Schema and model from mongoose

 const { Schema, model } = mongoose

 // Make user schema

 const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Make user model

const User = model('User', userSchema)

// Export user model
module.exports = User