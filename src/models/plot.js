const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlotSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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
        required: true
    },
    // images: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    noOfOpenSide: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("user", PlotSchema);