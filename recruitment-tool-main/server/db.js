const { MongoClient } = require('mongodb');
const { DB_NAME } = require('./constants');
const fs = require('fs');

let db;

const initDb = async () => {
    const client = await MongoClient.connect(`mongodb://localhost:27017/${DB_NAME}`);
    db = client.db();
    db.listCollections({ name: 'candidates' }).next((err, collectionName) => {
        if (!collectionName) {
            const candidates = JSON.parse(fs.readFileSync('./candidates.json', 'utf-8'));
            db.createCollection('candidates');
            db.collection('candidates').insertMany(candidates);
        }
    })

    return db;
};

const resetDb = async () => {
    const candidates = JSON.parse(fs.readFileSync('./candidates.json', 'utf-8'));
    db.dropDatabase();
    db.createCollection('candidates');
    db.collection('candidates').insertMany(candidates);
};


const getDb = () => {
    if (!db) {
        throw Error('Database not initialized!');
    }

    return db;
}

module.exports = {
    initDb,
    getDb,
    resetDb,
};
