const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        // required: true
    },
    // images: {
    //     type: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    facing: {
        type: String,
        required: true
    },
    furnishing: {
        type: String,
        // required: true
    }
})

module.exports = mongoose.model("House", HouseSchema);