const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true })

Post.create({
          title : 'Title',
          description : 'Description',
          content : 'Content'
}, (error, post) => {
          console.log(error, post)
} )