/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require('./connections')
const posts = [{
    author: 'John',
    title: 'First Post',
    body: 'This is the body of post 1',
    datePublished: '2019-01-01'
},
{
    author: 'Jane',
    title: 'Second Post',
    body: 'This is the body of post 2',
    datePublished: '2019-01-02'
},
{
    author: 'John',
    title: 'Third Post',
    body: 'This is the body of post 3',
    datePublished: '2019-01-03'
},
]
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
    datePublished: { type: Date, default: Date.now },
    img: String
},{timestamps: true})

// Make post model // the '' argument becomes a collection
const post = model('post', postschema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = post;
module.exports = posts;