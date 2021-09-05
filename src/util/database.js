const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://Chinmay:cheenu@cluster0.v71un.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log("connected")
            _db = client.db()
            callback()
        }).catch(err => {
        console.log(err)
        throw  err;
    })
}

const getDb = ()=>{
    if(_db){
        return _db
    }
    throw "No database found!"
}

module.exports = {
    mongoConnect,
    getDb
}