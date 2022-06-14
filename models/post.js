/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require('./connections')
const posts = [{
    title: 'post 1',
    body: 'This is the body of post 1',
    datePublished: '2019-01-01',
    imgUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
}]
///////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to:
const { Schema, model } = mongoose



// Make post Schema
const postschema = new Schema({
    author: String,
    title: String,
    body: String,
    datePublished: Date,
    img: String
})

// Make post model // the '' argument becomes a collection
const post = model('post', postschema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = post;
module.exports = posts;