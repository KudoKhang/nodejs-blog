const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost:27017/nodejs-test', { useNewUrlParser: true })

// Post.create({
//           title : 'Title',
//           description : 'Description',
//           content : 'Content'
// }, (error, post) => {
//           console.log(error, post)
//           console.log(post.title)
// } )

Post.find({
    title : 'Title'
}, (error, post) => {
    console.log(error, post)
})