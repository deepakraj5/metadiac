const mongoose = require('mongoose')
const { Types } = require('mongoose')

const panelSchema = new mongoose.Schema({

    name: String,
    owner_id: Types.ObjectId,
    board_id: Types.ObjectId

}, {
    timestamps: true
})

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel