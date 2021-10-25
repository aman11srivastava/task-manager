const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            // if(value.length < 6){
            //     throw new Error('Password length too short')
            // }
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be "password". Try something different')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// userSchema.statics.findByCredentials = async (email, password) => {
const findUserByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if (!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user?.password)
    if (!isMatch){
        throw new Error('Unable to login')
    }
    return user;
}

// Hashing plain text password
// Pre method will be called before an event here -> before the user is saved into the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = {User, findUserByCredentials}