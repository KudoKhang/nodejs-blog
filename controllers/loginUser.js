const User = require('../database/models/Users')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if(same) {
                    req.session.userId = user._id
                    return res.redirect('/web')
                } else {
                    return res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
}