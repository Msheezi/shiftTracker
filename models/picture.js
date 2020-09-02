const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureSchema = new Schema({
    shiftId: {
        type: String,
        required: true
    },
    pictureType: {
        type: String,
        required: true
    }, 
    pictureUrl: {
        type: String,
        required: true
    }
})


module.exports = Picture = mongoose.model("pictures", PictureSchema)