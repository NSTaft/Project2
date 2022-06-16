/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV variables from .env file
const express = require('express') 
const morgan = require('morgan') 
const methodOverride = require('method-override') 
const Post = require('./models/post.js')
const app = require("liquid-express-views")(express())

const path = require('path')
const MongoStore = require('connect-mongo')
const rowdy = require('rowdy-logger')
const mongoose = require('mongoose')
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
app.use(express.urlencoded({ extended: false })) // parse urlencoded request bodies
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

// Seed the database with dummy data
app.get('/posts/seed', (req, res) => {
    // array of dummy data)
    const seedPosts = [{
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

    Post.remove({})
    .then(data => {
        console.log('removed all posts', data)
        // create dummy data
        Post.create(seedPosts)
        .then(data => {
            console.log('created dummy posts', data)
            res.send(data)
        })
    })
})

// Index route for all posts
app.get('/posts', (req, res) => {
    // find all posts in the database
    Post.find({})
    //then render a template with all the posts
    .then(posts => {
        res.render('index', { posts })
    })
    .catch(error => {
        console.log(error)
        res.json({ error})
    })
})

// New route for creating a new post
app.get('/posts/new', (req, res) => {
    console.log(req.body)
    res.render('new')
})

// create -> POST route that actually calls the db and makes a new document
app.post('/posts', (req, res) => {
    // now we're ready for mongoose to do its thing
    Post.create(req.body)
        .then(post => {
            console.log('this was returned from create', post)
            res.redirect('/posts')
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })

})

// edit route -> GET that takes us to the edit form view
app.get('/posts/:id/edit', (req, res) => {
    // we need to get the id
    const postId = req.params.id
    // find the post
    Post.findById(postId)
    // -->render if there is a post
        .then(post => {
            res.render('edit', { post })
        })
    // -->error if no post
        .catch(err => { 
            console.log(err)
            res.json(err)
        })
})

// update route -> sends a put request to our database
app.put('/posts/:id', (req, res) => {
    // get the id
    const postId = req.params.id
    // tell mongoose to update the post
    Post.findByIdAndUpdate(postId, req.body, { new: true })
    // if successful -> redirect to the post page
        .then(post => {
            console.log('the updated post', post)

            res.redirect(`/posts/${post.id}`)
        })
    // if an error, display that
        .catch(error => res.json(error))
})

// Show route for a single post
app.get('/posts/:id', (req, res) => {
    // first, we need to get the id
    const postId = req.params.id
    // then we can find a post by its id
    Post.findById(postId)
    // once found, we can render a view with the data
        .then(post => {
            res.render('show', { post })
        })
    // if there is an error, show that instead
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// delete route
app.delete('/posts/:id', (req, res) => {
    // get the post id
    const postId = req.params.id
    // delete the post
    Post.findByIdAndRemove(postId)
        .then(post => {
            console.log('deleted', post)
            res.redirect('/posts')
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})




// Show route for a single post
// app.get('/posts/:indexOfPosts', (req, res) => {
//     res.render('show', {
//         post: posts[req.params.indexOfPosts]
//     })
// })

// Delete route for a single post
// app.delete('/posts/:indexOfPosts', (req, res) => {
//     posts.splice(req.params.indexOfPosts, 1)
//     // remove 1 post from the posts array
//     res.redirect('/posts')
// })

// Edit route for a single post
// app.get('/posts/:indexOfPosts/edit', (req, res) => {
//     res.render(
//         'edit', 
//     {
//         post: [req.params.indexOfPosts],
//         index: req.params.indexOfPosts
// })})


//////////////////////////////////
// Server Listener
//////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Now listening on port ${PORT}`)
// routesReport.print()
})

