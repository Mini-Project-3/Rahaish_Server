const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        default: "abc",
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    house: [
        {
            type: Schema.Types.ObjectId,
            ref: "House"
        }
    ],
    flat: [
        {
            type: Schema.Types.ObjectId,
            ref: "Flat"
        }
    ],
    plot: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plot"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'user_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("User", UserSchema);