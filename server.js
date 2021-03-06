/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV variables from .env file
const express = require('express') 
const morgan = require('morgan') 
const methodOverride = require('method-override') 
const Post = require('./models/post.js')
const app = require("liquid-express-views")(express())
const PostRouter = require('./controllers/posts.js')
const UserRouter = require('./controllers/user.js')
const CommentRouter = require('./controllers/comments.js')
const session = require('express-session')
const path = require('path')
const MongoStore = require('connect-mongo')
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)
const mongoose = require('mongoose')

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.MONGODB_URI
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)



// Global configuration
// const mongoURI = 'mongodb://127.0.0.1/blog'
const db = mongoose.connection
// // Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", DATABASE_URL));
db.on("close", () => console.log("mongo disconnected"));

console.log(db)



/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) // for request logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: false })) // parse urlencoded request bodies
app.use(express.static("public")) // tells express to use the public folder for static content
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: DATABASE_URL }),
        saveUninitialized: true,
        resave: false
    })
)
app.use((req, res, next) => {console.log('I run all routes')
    next() }) // middleware to run on all routes
app.use(express.json()) // parse json request bodies

///////////////////////////////////
// Routes
///////////////////////////////////
app.use('/posts', PostRouter)
app.use('/user', UserRouter)
app.use('/comment', CommentRouter)

app.get('/', (req, res) => {
    res.redirect('/user/signup')
})


//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Now listening on port ${PORT}`)

routesReport.print()
})

console.log()
