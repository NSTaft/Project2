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
    res.send('your server is running, better go catch it')
})


//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))