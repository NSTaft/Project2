// Dependencies
/////////////////////////
const express = require('express')
const Post = require('../models/post.js')

// Create Route
const router = express.Router()

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });

//////////////////////////
// Routes
//////////////////////////



// Index route for all posts
router.get('/', (req, res) => {
    // find all posts in the database
    Post.find({ username: req.session.username })
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
router.get('/new', (req, res) => {
    console.log(req.body)
    res.render('new')
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
    // add username to req.body to track related user
    req.body.username = req.session.username
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
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
    // first, we need to get the id
    const postId = req.params.id
    // then we can find a post by its id
    Post.findById(postId)
    .populate("comments")
    // once found, we can render a view with the data
        .then(post => {
            console.log(post)
            res.render('show', { post })
        })
    // if there is an error, show that instead
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// delete route
router.delete('/:id', (req, res) => {
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


////////////////////
// Export the router
////////////////////
module.exports = router