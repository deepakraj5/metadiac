const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const Board = require('../../models/board')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const { Types } = require('mongoose')

const router = express.Router()


// signup
router.post('/signup', async (req, res) => {
    try {
        
        const { password, email } = req.body

        const users = await User.findOne({ email })
        if(users) return res.status(409).send('User already exists')

        // encrypt password
        const ePassword = await bcrypt.hash(password, 12)

        // new user
        const newUser = new User(req.body)
        newUser.password = ePassword

        await newUser.save()

        res.send('User created')

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


// signin
router.post('/login', async (req, res) => {
    try {
        
        const { email, password } = req.body

        // user from database
        const user = await User.findOne({ email })

        if(!user) return res.status(400).send('wrong email or password')

        // check password
        const ePassword = await bcrypt.compare(password, user.password)

        if(!ePassword) return res.status(400).send('wrong email or password')

        // token generation
        const token = jwt.sign({ _id: user?._id, email: user?.email }, process.env.JWT_SECRET)

        res.send({ token, email: user?.email, name: user?.name, _id: user?._id })

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})

// profile
router.get('/profile', auth, async (req, res) => {
    try {
        
        const user = req.user
        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


// user list
router.get('/users/:board_id', auth, async (req, res) => {
    try {
        
        const { board_id } = req.params

        const users = await User.find({ _id: { $ne: req.user?._id } }, { name: 1 }).lean()
        const board = await Board.findOne({ _id: board_id }, { permissions: 1, owner_id: 1 })
        let usersList = []


        for(let i=0;i<users.length;i++) {
            if ((users[i]._id).toString() !== (board.owner_id).toString(0)) {
                let data = {
                    _id: users[i]._id,
                    name: users[i].name,
                    permission: board.permissions?.includes(Types.ObjectId(users[i]._id))
                }
                usersList.push(data)
            }
        }

        res.send(usersList)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


module.exports = router