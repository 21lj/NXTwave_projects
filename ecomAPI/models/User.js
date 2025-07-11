const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = {
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true ,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}

const UserSchema = new mongoose.Schema(userModel)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", UserSchema);