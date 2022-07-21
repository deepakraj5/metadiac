const express = require('express')
const auth = require('../../middleware/auth')
const Board = require('../../models/board')
const Panel = require('../../models/panel')
const Card = require('../../models/card')

const router = express.Router()


// add card
router.post('/cards', auth, async (req, res) => {
    try {
        
        const cards = new Card(req.body)
        cards.owner_id = req.user?._id

        await cards.save()

        res.send('card created')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// list cards
router.get('/cards/:panel_id', auth, async (req, res) => {
    try {

        const { panel_id } = req.params
        
        const cards = await Card.find({ panel_id })

        res.send(cards)

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// update card
router.patch('/cards', auth, async (req, res) => {
    try {
        
        const { card_id } = req.body

        await Card.updateOne({ _id: card_id }, {
            $set: req.body
        })

        res.send('card updated')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// delete card
router.delete('/cards/:card_id', auth, async (req, res) => {
    try {
        
        const { card_id } = req.params

        await Card.deleteOne({ _id: card_id })

        res.send('card deleted')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})



module.exports = router