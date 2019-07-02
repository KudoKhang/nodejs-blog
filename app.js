const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost:27017/nodejs-test', {
    useNewUrlParser: true
})

app.set('views', `${__dirname}/views`)
app.use(express.static('public'))
app.use(require('express-edge'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/web', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts : posts
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/web')
    })
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(3000, () => {
    console.log('App listening on port 3000')
})