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
const articlesSchema = new Schema({
    title: String,
    datePublished: Date,
    img: Image,
    text: String
})

// Make article model // the '' argument becomes a collection
const Article = model('Article', articlesSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Article;