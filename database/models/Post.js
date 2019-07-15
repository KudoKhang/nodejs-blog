const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    image : String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', PostSchema)