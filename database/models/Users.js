const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Please provide your username']
    },
    email : {
        type : String,
        required : [true, 'Please provide your email'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please provide your password']
    }
})

UserSchema.pre('save', function(next) {
    const user = this
    const saltRound = 10
    bcrypt.hash(user.password, saltRound, function(error, encrypted) {
        if(!error){
            user.password = encrypted
            next()
        } 
    })
})

module.exports = mongoose.model('User', UserSchema) 