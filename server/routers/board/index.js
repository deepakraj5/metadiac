const express = require('express')
const auth = require('../../middleware/auth')
const Board = require('../../models/board')
const Panel = require('../../models/panel')
const Card = require('../../models/card')

const router = express.Router()


// add board
router.post('/boards', auth, async (req, res) => {
    try {
        
        const board = new Board(req.body)
        board.owner_id = req.user?._id

        await board.save()

        res.send('board created')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// list boards
router.get('/boards', auth, async (req, res) => {
    try {
        
        const boards = await Board.aggregate([
            {
                $unwind: {
                    path: "$permissions",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $or: [{ permissions: req.user?._id }, { owner_id: req.user?._id }]
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$$ROOT.name" },
                    description: { $first: "$$ROOT.description" },
                    createdAt: { $first: "$$ROOT.createdAt" }
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ])

        res.send(boards)

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// update permission
router.post('/boards/permission', auth, async (req, res) => {
    try {
        
        const { permissions, board } = req.body

        await Board.updateOne({ _id: board }, {
            $set: {
                permissions: permissions
            }
        })

        res.send('updated')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// update board
router.patch('/boards', auth, async (req, res) => {
    try {
        
        const { board_id } = req.body

        await Board.updateOne({ _id: board_id }, {
            $set: req.body
        })

        res.send('board updated')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// delete board
router.delete('/boards/:board_id', auth, async (req, res) => {
    try {
        
        const { board_id } = req.params

        await Board.deleteOne({ _id: board_id })
        await Panel.deleteMany({ board_id })

        res.send('board deleted')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})



module.exports = router