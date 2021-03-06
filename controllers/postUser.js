const User = require('../database/models/Users')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if(error){
            const regErr =  Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('regErr', regErr)
            req.flash('data', req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/web')
    })
}