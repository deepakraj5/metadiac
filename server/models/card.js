const mongoose = require('mongoose')
const { Types } = require('mongoose')

const cardSchema = new mongoose.Schema({

    name: String,
    description: String,
    owner_id: Types.ObjectId,
    panel_id: Types.ObjectId

}, {
    timestamps: true
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card