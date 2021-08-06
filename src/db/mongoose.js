const mongoose = require('mongoose')
require('dotenv').config()

// Replace connection env with real connection string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database successfully')
})

