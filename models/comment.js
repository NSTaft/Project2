/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const { Schema } = require('mongoose')
const mongoose = require('./connections')

///////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to:
const commentsSchema = new Schema({
    username: String,
    text: String,
    date: Date,
})

// Make comment model
const Comment = model('Comment', commentsSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Comment;