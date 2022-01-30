const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
    if (req.method === 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    return res.status(200).json({ message: 'Go Serverless v3.0! Your function executed successfully!' });
});

app.use((req, res) => {
    return res.status(404).json({ error: 'Not Found' });
});

module.exports = {
    app,
    hello: serverless(app)
};