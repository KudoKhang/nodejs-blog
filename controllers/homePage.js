const Post = require('../database/models/Post')

module.exports = async (req, res) => {
	console.log(req.session.userId)
	const posts = await Post.find({}).populate('author')
	res.render('index', {
		posts
	})
}