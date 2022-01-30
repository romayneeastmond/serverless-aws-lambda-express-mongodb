const request = require('supertest');

const appSitesDevAddHandler = require('../../../src/dev/sites-dev-addSite').app;
const appSitesDevDeleteHandler = require('../../../src/dev/sites-dev-deleteSite').app;
const appSitesDevGetHandler = require('../../../src/dev/sites-dev-getSite').app;
const appSitesDevListHandler = require('../../../src/dev/sites-dev-listSites').app;
const appSitesDevUpdateHandler = require('../../../src/dev/sites-dev-updateSite').app;

describe('Express Sites Responses', () => {
    test('/sites/add', async () => {
        const result = await request(appSitesDevAddHandler).post('/sites/add');

        expect(result.statusCode).not.toBe(404);
    });

    test('/sites/add GET', async () => {
        const result = await request(appSitesDevAddHandler).get('/sites/add');

        expect(result.statusCode).toBe(404);
    });

    test('/sites/delete', async () => {
        const result = await request(appSitesDevDeleteHandler).delete('/sites/delete');

        expect(result.statusCode).not.toBe(404);
    });

    test('/sites/delete GET', async () => {
        const result = await request(appSitesDevDeleteHandler).get('/sites/delete');

        expect(result.statusCode).toBe(404);
    });

    test('/sites/get', async () => {
        const result = await request(appSitesDevGetHandler).get('/sites/get');

        expect(result.statusCode).not.toBe(404);
    });

    test('/sites/get POST', async () => {
        const result = await request(appSitesDevGetHandler).post('/sites/get');

        expect(result.statusCode).toBe(404);
    });

    test('/sites/list POST', async () => {
        const result = await request(appSitesDevListHandler).post('/sites/list');

        expect(result.statusCode).toBe(404);
    });

    test('/sites/update', async () => {
        const result = await request(appSitesDevUpdateHandler).post('/sites/update');

        expect(result.statusCode).not.toBe(404);
    });

    test('/sites/update GET', async () => {
        const result = await request(appSitesDevGetHandler).get('/sites/update');

        expect(result.statusCode).toBe(404);
    });
});