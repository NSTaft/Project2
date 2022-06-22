// Dependencies
/////////////////////////
const express = require('express')
const Post = require('../models/post.js')
const Comment = require('../models/comment.js')

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

// create -> POST route that actually calls the db and makes a new document
router.post('/:postId', (req, res) => {
    // add username to req.body to track related user
    req.body.author = req.session.username
    // now we're ready for mongoose to do its thing
    Comment.create(req.body)
        .then(comment => {
            console.log('this was returned from create', comment)
            // res.redirect('/posts')
            Post.findById(req.params.postId)
            .then(post => {
                post.comments.push(comment._id)
                post.save()
                res.redirect(`/posts/${req.params.postId}`)
            })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })

})

// delete route
router.delete('/:postId/:commentId', (req, res) => {
    // get the comment id
    const commentId = req.params.commentId
    const postId = req.params.postId
    // delete the post
    Comment.findByIdAndRemove(commentId)
        .then(comment => {
            console.log('deleted', comment)
            res.redirect(`/posts/${postId}`)
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
    // we need to get the id
    const commentId = req.params.id
    // find the post
    Comment.findById(commentId)
    // -->render if there is a post
        .then(comment => {
            res.render('comments/editcomment', { comment })
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
    const commentId = req.params.id
    // tell mongoose to update the comment
    Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    // if successful -> redirect to the post page
        .then(comment => {
            console.log('the updated comment', comment)

            res.redirect(`/posts`)
        })
    // if an error, display that
        .catch(error => res.json(error))
})










  ////////////////////
// Export the router
////////////////////
module.exports = router
