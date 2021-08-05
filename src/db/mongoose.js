const mongoose = require('mongoose')
require('dotenv').config()
const validator = require('validator')

// console.log(process.env.MONGODB_CONNECTION_STRING)

    // Replace connection env with real connection string
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database successfully')
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
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

const me = new User({
    name: '   Aman   ',
    email: 'aman11srivastava@gmail.com',
    password: 'qwerty12345',
    age: 23
})

me.save().then((me) => {
    console.log(me)
}).catch((err) => {
    console.log('Error ', err.message)
})

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({
    description: 'Second task',
})

task.save()
.then((task) => {
    console.log(task)
})
.catch((err) => {
    console.log('Error ', err)
})