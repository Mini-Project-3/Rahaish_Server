const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);