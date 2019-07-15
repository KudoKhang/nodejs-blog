module.exports = (req, res) => {
    res.render('register', {
        errors : req.flash('regErr'),
        data : req.flash('data')[0]
        
    })
}