const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
    owner_id: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    rent: {
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
    furnishing: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    // images: {
    //     type: String,
    //     required: true
    // },
})

autoIncrement.initialize(mongoose.connection);
FlatSchema.plugin(autoIncrement.plugin, {
    model: 'Flat',
    field: 'flat_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("Flat", FlatSchema);