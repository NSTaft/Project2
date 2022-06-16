/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV variables from .env file
const express = require('express') 
const morgan = require('morgan') 
const methodOverride = require('method-override') 
const path = require('path')
const Post = require('./models/post.js')
const MongoStore = require('connect-mongo')
const posts = require('./models/post.js')
const rowdy = require('rowdy-logger')
const mongoose = require('mongoose')
const app = require("liquid-express-views")(express())
const routesReport = rowdy.begin(app)


// Global configuration
const mongoURI = 'mongodb://127.0.0.1/blog'
const db = mongoose.connection
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));





/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) // for request logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // tells express to use the public folder for static content
app.use((req, res, next) => {console.log('I run all routes')
    next() }) // middleware to run on all routes
app.use(express.json()) // parse json request bodies

const myFirstPost = {
    author: 'Nathan',
    title: 'My First Post',
    body: 'This is the body of my first post',
    datePublished: '2022-06-15'
}

// Post.create(myFirstPost)
// // if database transaction succeeds
// .then((post) => {
//     console.log(post)
//     })
//     // if database transaction fails
//     .catch((error) => {
//         console.log(error) 
//     })
//     // close database connection either way
//     .finally(() => {
//         db.close()
// })

///////////////////////////////////
// Routes
///////////////////////////////////

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.post('/posts', (req, res) => {
    Post.push(req.body)
    console.log(posts)
    res.redirect('/posts')
})

// Index route for all posts
app.get('/posts', (req, res) => {
    res.render('index', {
        allPosts: posts
    })
})


// New route for creating a new post
app.get('/posts/new', (req, res) => {
    console.log(req.body)
    res.render('new.liquid')
})


// Show route for a single post
app.get('/posts/:indexOfPosts', (req, res) => {
    res.render('show', {
        post: posts[req.params.indexOfPosts]
    })
})

// Delete route for a single post
app.delete('/posts/:indexOfPosts', (req, res) => {
    posts.splice(req.params.indexOfPosts, 1)
    // remove 1 post from the posts array
    res.redirect('/posts')
})

// Edit route for a single post
app.get('/posts/:indexOfPosts/edit', (req, res) => {
    res.render(
        'edit', 
    {
        post: posts[req.params.indexOfPosts],
        index: req.params.indexOfPosts
})})

app.put('/posts/:indexOfPosts', (req, res) => {
    posts[req.params.indexOfPosts] = req.body
    res.redirect('/posts')
})

//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Now listening on port ${PORT}`)
// routesReport.print()
})

