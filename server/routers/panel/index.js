const express = require('express')
const auth = require('../../middleware/auth')
const Board = require('../../models/board')
const Panel = require('../../models/panel')
const Card = require('../../models/card')
const { Types } = require('mongoose')

const router = express.Router()


// add panel
router.post('/panels', auth, async (req, res) => {
    try {
        
        const panel = new Panel(req.body)
        panel.owner_id = req.user?._id

        await panel.save()

        res.send('panel created')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// list panels
router.get('/panels/:board_id', auth, async (req, res) => {
    try {
        
        const { board_id } = req.params

        const panels = await Panel.aggregate([
            {
                $match: {
                    board_id: Types.ObjectId(board_id)
                }
            },
            {
                $lookup: {
                    localField: "_id",
                    foreignField: "panel_id",
                    from: "cards",
                    as: "cards"
                }
            },
        ])

        res.send(panels)

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})



// update panel
router.patch('/panels', auth, async (req, res) => {
    try {
        
        const { panel_id } = req.body

        await Panel.updateOne({ _id: panel_id }, {
            $set: req.body
        })

        res.send('panel updated')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// delete panel
router.delete('/panels/:panel_id', auth, async (req, res) => {
    try {
        
        const { panel_id } = req.params

        await Panel.deleteOne({ _id: panel_id })
        await Card.deleteMany({ panel_id })

        res.send('panel deleted')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// drag and drop card on panel
router.post('/panel/drag', auth, async (req, res) => {
    try {
        
        const { card_id, panel_id } = req.body

        await Card.updateOne({ _id: card_id }, {
            $set: {
                panel_id
            }
        })

        res.send("panel updated")

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})



module.exports = router