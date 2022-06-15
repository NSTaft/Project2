/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const post = require('./models/post.js')
const MongoStore = require('connect-mongo')
const posts = require('./models/post.js')



/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express())


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



///////////////////////////////////
// Routes
///////////////////////////////////

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.post('/posts', (req, res) => {
    post.push(req.body)
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
app.get('/posts/:indexOfposts', (req, res) => {
    res.render('show', {
        post: posts[req.params.indexOfposts]
    })
})

app.delete('/posts/:indexOfposts', (req, res) => {
    posts.splice(req.params.indexOfposts, 1)
    // remove 1 post from the posts array
    res.redirect('/posts')
})

//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))