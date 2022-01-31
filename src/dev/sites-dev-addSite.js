const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const clientPromise = require('../../lib/mongodb-client').clientPromise;

const app = express();

app.use(bodyParser.json({ strict: false }));

const callback = async (mongoClientPromise, req, res) => {
    const url = req.body.url;
    const description = req.body.description;

    if ((url === undefined || url.trim().length === 0) || (description === undefined || description.trim().length === 0)) {
        return res.status(422).json({ error: 'Request Payload requires url and description values' });
    }

    await mongoClientPromise.then(async (client) => {
        const db = client.db();

        const collection = db.collection('definitions');

        const data = await collection.insertOne({ url, description });

        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({ error: error });
    })
}

app.post(['/', '/sites/add'], async (req, res) => {
    return callback(clientPromise, req, res);
});

module.exports = {
    app,
    callback,
    handler: serverless(app)
};