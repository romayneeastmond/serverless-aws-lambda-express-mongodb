if (process.env.NODE_ENV !== 'test') {
    const MongoClient = require('mongodb').MongoClient;

    const client = new MongoClient(process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true });

    const clientPromise = client.connect();

    module.exports = {
        clientPromise
    }
} else {
    module.exports = {
        clientPromise: new Promise((resolve, reject) => {
            resolve();
            reject();
        })
    }
}
