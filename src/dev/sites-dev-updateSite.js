const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const ObjectId = require('mongodb').ObjectId;
const clientPromise = require('../../lib/mongodb-client').clientPromise;

const app = express();

app.use(bodyParser.json({ strict: false }));

app.all(['/', '/sites/update'], async (req, res) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const id = req.query.id;
    const url = req.body.url;
    const description = req.body.description;

    let errors = [];

    if (id === undefined || id.trim().length === 0) {
        errors.push('Query String Parameters requires an id value');
    }

    if ((url === undefined || url.trim().length === 0) || (description === undefined || description.trim().length === 0)) {
        errors.push('Request Payload requires url and description values');
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    await clientPromise.then(async (client) => {
        const db = client.db();

        const collection = db.collection('definitions');

        const data = await collection.findOneAndUpdate(
            { _id: ObjectId(id) }, { $set: { ...req.body } })

        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({ error: error });
    })
});

module.exports = {
    app,
    handler: serverless(app)
};