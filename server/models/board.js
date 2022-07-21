const mongoose = require('mongoose')
const { Types } = require('mongoose')

const boardSchema = new mongoose.Schema({

    name: String,
    description: String,
    owner_id: Types.ObjectId,
    permissions: [Types.ObjectId]

}, {
    timestamps: true
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board