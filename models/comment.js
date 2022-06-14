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
const { Schema, model } = mongoose

// Make comments Schema
const commentSchema = new Schema({
    username: String,
    text: String,
    date: Date,
})

// Make comment model, argument becomes a collection
const Comment = model('Comment', commentSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Comment;