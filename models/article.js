/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require('./connections')

///////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to:
const { Schema, model } = mongoose

// Make article Schema
const articleSchema = new Schema({
    title: String,
    datePublished: Date,
    img: String,
    text: String
})

// Make article model // the '' argument becomes a collection
const Article = model('Article', articleSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Article;