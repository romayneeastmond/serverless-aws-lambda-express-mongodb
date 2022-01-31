const { MongoClient } = require('mongodb');

const callbackSitesDevAdd = require('../../../src/dev/sites-dev-addSite').callback;
const callbackSitesDevDelete = require('../../../src/dev/sites-dev-deleteSite').callback;
const callbackSitesDevGet = require('../../../src/dev/sites-dev-getSite').callback;
const callbackSitesDevList = require('../../../src/dev/sites-dev-listSites').callback;
const callbackSitesDevUpdate = require('../../../src/dev/sites-dev-updateSite').callback;

describe('Express Sites Callbacks', () => {
    let connection;

    const mockRequest = (verb, query = {}, body = {}) => {
        return {
            method: verb,
            query: query,
            body: body
        };
    };

    const mockResponse = () => {
        const res = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        return res;
    };

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__,
            { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await connection.close();
    });

    test('/sites/add Empty Body', async () => {
        const req = mockRequest('POST');
        const res = mockResponse();

        await callbackSitesDevAdd(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/delete Not Found', async () => {
        const req = mockRequest('DELETE', {
            id: 'cb0bbe87-255a-4d77-8a27-dfe25ff19053'
        });

        const res = mockResponse();

        await callbackSitesDevDelete(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/delete Empty Query', async () => {
        const req = mockRequest('DELETE');
        const res = mockResponse();

        await callbackSitesDevDelete(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/get Not Found', async () => {
        const req = mockRequest('GET', {
            id: '9b53be28-fc14-476e-890e-f598c20f1007'
        });

        const res = mockResponse();

        await callbackSitesDevGet(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/get Empty Query', async () => {
        const req = mockRequest('GET');
        const res = mockResponse();

        await callbackSitesDevGet(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/list', async () => {
        const req = mockRequest('GET');
        const res = mockResponse();

        await callbackSitesDevList(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/update GET', async () => {
        const req = mockRequest('GET');
        const res = mockResponse();

        await callbackSitesDevUpdate(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/update NOT FOUND', async () => {
        const req = mockRequest('PUT', {
            id: '2715c20d-1751-4dce-a8e0-5fb2d4d419fb'
        }, {
            url: 'http://www.e7cdf4a3-ddb6-485c-90aa-2e4c58215e75.com/',
            description: 'Test description'
        });
        const res = mockResponse();

        await callbackSitesDevUpdate(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('/sites/update Empty Query and Body', async () => {
        const req = mockRequest('PUT');
        const res = mockResponse();

        await callbackSitesDevUpdate(connection.connect(), req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);
    });
});