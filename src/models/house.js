const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
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
    floor: {
        type: Number,
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
    status: {
        type: String,
        required: true
    },
    facing: {
        type: String,
        required: true
    },
    furnishing: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection);
HouseSchema.plugin(autoIncrement.plugin, {
    model: 'House',
    field: 'house_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("House", HouseSchema);