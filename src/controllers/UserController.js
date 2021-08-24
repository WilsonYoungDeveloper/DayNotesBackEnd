const User = require('../models/UserData');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const secret = 'wilsontools';

module.exports = {

    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Necessário informar nome/email/senha!"
            })
        }
        if (password.length < 4) {
            return res.status(400).json({
                error: "Senha muito curta!"
            })
        }

        User.findOne({ email: email }).then((user) => {
            if (user) {
                return res.json({
                    error: "Já existe uma conta com este e-mail cadastrado!"
                })
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.password, salt, (erro, hash) => {
                        if (erro) {
                            return res.json({
                                error: "Houve um erro ao salvar usuário!"
                            })
                        }
                        else {
                            newUser.password = hash
                            newUser.save().then(() => {
                                return res.json(newUser)
                            }).catch((err) => {
                                return res.json({
                                    error: "Houve um erro ao salvar usuário!"
                                })
                            })
                        }
                    })
                })
            }
        })
    },

    async login(req, res) {
        const { email, password } = req.body;

        User.findOne({ email: email }).then((user) => {
            if (!user) {
                return res.json({ error: "Esta conta não existe!" });
            }

            bcrypt.compare(password, user.password, (error, success) => {

                if (success) {
                    let token = jwt.sign({ userId: user._id }, secret, { expiresIn: expiresIn });
                    return res.json({ user, auth: true, token });
                }
                else {
                    return res.json({ error: "Senha incorreta!" })
                }
            })
        })
    },

    async logout(req, res) {
        res.end();
    }
}