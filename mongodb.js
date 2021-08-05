const mongodb = require('mongodb');
require('dotenv').config()

const MongoClient = mongodb.MongoClient
const COLLECTION_NAME = 'users'

MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(process.env.DATABASE_NAME)
    // db.collection(COLLECTION_NAME).insertOne({
    //     name: 'Aman',
    //     age: 23
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Error ', error.message)
    //     }
    //     console.log(result);
    // })

    // db.collection(COLLECTION_NAME).insertMany([
    //     {
    //         name: 'CR7',
    //         age: 36
    //     },
    //     {
    //         name: 'Messi',
    //         age: 34
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error ', error.message)
    //     }
    //     console.log(result)
    // })



})