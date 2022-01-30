const request = require('supertest');

const appHelloHandler = require('../../../handler').app;

describe('Express Dev Responses', () => {
    test('/', async () => {
        const result = await request(appHelloHandler).get('/');

        expect(result.statusCode).toBe(200);
        expect(result.type).toContain('application/json');
    });

    test('/ POST', async () => {
        const result = await request(appHelloHandler).post('/');

        expect(result.statusCode).toBe(405);
        expect(result.text).toContain('Method Not Allowed');
    });

    test('/404-Error-Test', async () => {
        const result = await request(appHelloHandler).get('/some-url-not-existing');

        expect(result.statusCode).toBe(404);
    });
});