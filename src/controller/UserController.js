const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    async register(req, res){

        const { name, email, password } = req.body;

        const selectedUser = User.findOne({
            email: email
        })

        if(selectedUser) return res.status(400).json('User already exists')

        const encryptPass = bcrypt.hashSync(password)

        const user = await new User({
            name,
            email,
            password: encryptPass
        }).save()

        return user;

    },

    async login(req, res){

        const { email, password } = req.body;

        const user = await User.findOne({
            email
        })

        if(!user) return res.status(400).json("User or password incorrect")

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) return res.status(400).json("User or password incorrect")

        // create our token, don't let your secret here in production
        const SECRET = '012nf1nk;1;?akd-1ni1fo23fjnqw031'

        const token = jwt.sign(user._id, SECRET)

        res.header('token', token)
        
        return res.json('Usuário logado')


    }



}