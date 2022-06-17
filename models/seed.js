const mongoose = require('mongoose')
const Post = require('./post')

// Save the connection in a variable
const db = mongoose.connection

// Make sure code is not run until the connection is ready

db.on('open', () => {
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

    // Delete all Posts
  Post.deleteMany({})
  .then((deletedPosts) => {
    // add the seed posts
    Post.create(seedPosts)
      .then((newPosts) => {
        console.log(newPosts);
        db.close();
      })
      .catch((error) => {
        console.log(error);
        db.close();
      });
  })
  .catch((error) => {
    console.log(error);
    db.close();
  })})