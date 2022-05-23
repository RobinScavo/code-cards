const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter a user name.'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [6, 'Minimum password length is six characters.']
    },
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;
