/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const Article = require('./models/article.js')
const MongoStore = require('connect-mongo')
const articles = require('./models/article.js')



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
    res.send('Hello World')
})

// Index route
app.get('/articles', (req,res) => {
    console.log(articles)
    res.send(articles)
})
    
// Show route
app.get('/articles/:indexOfArticles', (req,res) => {
    res.send(articles[req.params.indexOfArticles])
    })


//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))