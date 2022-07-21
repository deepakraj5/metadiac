const User = require('../models/user')
const jwt = require('jsonwebtoken')


// middleware for checking authentication
const auth = async (req, res, next) => {
    try {
        
        const JWT_SECRET = process.env.JWT_SECRET

        // token from header
        const token = req.header('Authorization').replace('Bearer ', '')
        const verifiedToken = jwt.verify(token, JWT_SECRET)

        // verify user
        const user = await User.findOne({ _id: verifiedToken._id }, { password: 0 })

        if(!user) throw new Error()

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send('Unauthenticated')
    }
}


module.exports = auth