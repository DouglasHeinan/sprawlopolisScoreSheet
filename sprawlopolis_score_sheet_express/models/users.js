const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"]
    }
});

module.exports = mongoose.model("User", UserSchema)
