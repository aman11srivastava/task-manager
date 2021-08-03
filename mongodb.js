const mongodb = require('mongodb');
const {log} = require("nodemon/lib/utils");
require('dotenv').config()

const MongoClient = mongodb.MongoClient

MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true
}, (error, client) => {
    if (error){
        return console.log('Unable to connect to database')
    }
    const db = client.db(process.env.DATABASE_NAME)
    db.collection('users').insertOne({
        name: 'Aman',
        age: 23
    }, (error, result) => {
        if (error){
            return console.log('Error ', error.message)
        }
        console.log(result);
    })
})