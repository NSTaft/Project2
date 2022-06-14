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
app.use(express.static("public")) // serve files from public statically


///////////////////////////////////
// Routes
///////////////////////////////////

app.get('/', (req, res) => {
    res.send('Homepage')
})

// Index route for all posts
app.get('/posts', (req,res) => {
    res.render('index', {
        allPosts: posts
    })
})

app.post('/posts', (req, res) => {
    res.send('Hello World')
})

// New route for creating a new post
app.get('/posts/new', (req, res) => {
    res.render('new.liquid')
})


// Show route for a single post
app.get('/posts/:indexOfposts', (req,res) => {
    res.render('show', {
        post: posts[req.params.indexOfposts]
    })
})



//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))