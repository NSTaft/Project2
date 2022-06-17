const express = require('express')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

const router = express.Router()

// Routes

// Signup Routes (Get => form, post => submit)
router.get('/signup', (req, res) => {
    res.render('user/signup.liquid')
})

router.post('/signup', async (req, res) => {
    //encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //create new user
    User.create(req.body)
        .then((user) => {
            res.redirect('/user/login')
        })
        .catch((error) => {
            // send error as json
            console.log(error)
            res.json({ error })
        })
})

// Login Routes (Get => form, post => submit)
router.get('/login', (req, res) => {
    res.render('user/login.liquid')
})

router.post('/login', async (req, res) => {
    // get data from request body
    const { username, password } = req.body
    // search for user
    User.findOne({ username })
    .then(async (user) => {
        if (user) {
            // compare password
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                // redirect to posts if successful
                res.redirect('/posts')
                } else {
                    // error is password is incorrect
                    res.json({ error: 'Incorrect password' })
                    }
                    } else {
                        //send error if user not found
                        res.json({ error: 'User not found' })
                        }
                        })
                        .catch((error) => {
                            // send error as json
                            console.log(error)
                            res.json({ error })
                        })
                    })

// Export Router
module.exports = router 