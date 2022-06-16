/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

// const mongoose = require('./connections')
const mongoose = require('mongoose')

///////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to:
const { Schema, model } = mongoose



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


// Make post Schema
const postSchema = new Schema({
    author: String,
    title: String,
    body: String,
    datePublished: { type: Date, default: Date.now },
    img: String
},{timestamps: true})

// Creating Post model : We need to convert our schema into a model-- will be stored in 'Posts' collection.  Mongo does this for you automatically
// Models are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html

// Make post model // the '' argument becomes a collection
const Post = model('Post', postSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
//make this exportable to be accessed in `server.js`
module.exports = Post;
module.exports = posts;