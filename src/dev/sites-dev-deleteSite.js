const express = require('express');
const serverless = require('serverless-http');
const ObjectId = require('mongodb').ObjectId;
const clientPromise = require('../../lib/mongodb-client').clientPromise;

const app = express();

const callback = async (mongoClientPromise, req, res) => {
    const id = req.query.id;

    if (id === undefined || id.trim().length === 0) {
        return res.status(422).json({ error: 'Query String Parameters requires an id value' });
    }

    await mongoClientPromise.then(async (client) => {
        const db = client.db();

        const collection = db.collection('definitions');

        const data = await collection.findOneAndDelete({ _id: ObjectId(id) });

        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({ error: error });
    })
};

app.delete(['/', '/sites/delete'], async (req, res) => {
    return callback(clientPromise, req, res);
});

module.exports = {
    app,
    callback,
    handler: serverless(app)
};