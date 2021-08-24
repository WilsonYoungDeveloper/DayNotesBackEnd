const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Model de usuário
require('../models/UserData')
const User = mongoose.model('users');

module.exports = (passport) => {

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Esta conta não existe!" })
            }

            bcrypt.compare(passport, user.passport, (error, success) => {
                if (success) {
                    return done(null, user)
                }
                else {
                    return done(null, false, { message: "Senha incorreta!" })
                }
            })
        })
    }))
}