const path = require('path')
const Post = require('../database/models/Post')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
    const { image } = req.files
    const uploadPath = path.resolve(__dirname, '..' , 'public/posts', image.name )
    image.mv(uploadPath, (error) => {
        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
            if(error){
                return res.redirect('/web')
            }else {
                Post.create({
                    ...req.body,
                    image : result.secure_url,   //`/posts/${image.name}`,
                    author : req.session.userId
                },(error, post) => {
                    console.log(post),
                    res.redirect('/web')
                })
            }
        })
    })
}