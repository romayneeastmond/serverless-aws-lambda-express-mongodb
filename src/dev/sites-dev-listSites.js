const express = require('express');
const serverless = require('serverless-http');
const clientPromise = require('../../lib/mongodb-client').clientPromise;

const app = express();

const callback = async (mongoClientPromise, req, res) => {
    await mongoClientPromise.then(async (client) => {
        const db = client.db();

        const collection = db.collection('definitions');

        const data = await collection.find().toArray();

        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({ error: error });
    })
};

app.get(['/', '/sites/list'], async (req, res) => {
    return callback(clientPromise, req, res);
});

module.exports = {
    app,
    callback,
    handler: serverless(app)
};