const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;


const PlotSchema = new Schema({
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
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    openFaces: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // images: {
    //     type: String,
    //     required: true
    // },
})

autoIncrement.initialize(mongoose.connection);
PlotSchema.plugin(autoIncrement.plugin, {
    model: 'Plot',
    field: 'plot_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("Plot", PlotSchema);