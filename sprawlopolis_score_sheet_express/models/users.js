const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")
// const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // username: {
    //     type: String,
    //     required: [true, "Username cannot be blank"]
    // },
    // password: {
    //     type: String,
    //     required: [true, "Password cannot be blank"]
    // }
});
UserSchema.plugin(passportLocalMongoose);
// UserSchema.statics.findAndValidate = async function(username, password) {
//     const foundUser = await this.findOne({username});
//     const isValid = await bcrypt.compare(password, foundUser.password);
//     return isValid ? foundUser: false
// };

// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });

module.exports = mongoose.model("User", UserSchema)
