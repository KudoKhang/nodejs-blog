require('dotenv').config()

const express = require('express')
const app = express()
const edge = require('edge.js')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')


cloudinary.config({
	cloud_name : process.env.CLOUD_NAME,
	api_key : process.env.CLOUD_API_KEY,
	api_secret : process.env.CLOUD_API_SECRET
})

const homePage = require('./controllers/homePage')
const createPostController = require('./controllers/createPostController')
const storePostController = require('./controllers/storePostController')
const getPostController = require('./controllers/getPostController')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/postUser')
const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')
const loginUserController = require('./controllers/loginUser')
const connectMongo = require('connect-mongo') // create session id
const mongoose = require('mongoose')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true
})
// view engine setup
app.set('views', `${__dirname}/views`)
mongoose.set('useCreateIndex', true) // hide warning in console

app.use(express.static('public'))
app.use(require('express-edge'))
app.use(fileUpload())
app.use(connectFlash())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// app.use('*', (req, res, next) => {
// 	edge.global('auth', req.session.userId)
// })
 

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
	secret : process.env.EXPRESS_SECRET,
	store : new mongoStore({
		mongooseConnection : mongoose.connection
	})
}))


const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')


app.get('/hello', (req, res) => {
	res.end('Kk')
})

app.get('/web', homePage)
app.get('/posts/new', auth, createPostController)
app.post('/posts/store', auth ,storePost , storePostController)
app.get('/post/:id', getPostController)
app.post('/users/register',redirectIfAuthenticated,  storeUserController )
app.get('/auth/register' , redirectIfAuthenticated, createUserController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login',redirectIfAuthenticated, loginUserController)
app.get('/auth/logout',logoutController)
app.use((req, res) => res.sendFile('public/error.html', {root : __dirname}))

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`)
})