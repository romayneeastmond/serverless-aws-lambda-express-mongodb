const express = require('express');
const serverless = require('serverless-http');
const clientPromise = require('../lib/mongodb-client').clientPromise;

const app = express();

app.get(['/', '/sites/list'], async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    await clientPromise.then(async (client) => {
        const db = client.db();

        const collection = db.collection('definitions');

        const data = await collection.find().toArray();

        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({ error: error });
    })
});

module.exports = {
    app,
    handler: serverless(app)
};