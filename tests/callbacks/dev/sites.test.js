const request = require('supertest');

const appSitesDevListHandler = require('../../../src/dev/sites-dev-listSites').app;
const callbackSitesDevList = require('../../../src/dev/sites-dev-listSites').callback;

describe('Express Sites Callbacks', () => {
    test('/sites/list Callback', async () => {
        expect(' ').toBe(' ');
    });
});