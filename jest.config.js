module.exports = {
    roots: [
        '<rootDir>/tests',
        '<rootDir>/src',
        '<rootDir>/lib'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
        'handler.js',
        'src/**/*.js',
        'lib/**/*.js',
        '!lib/mongodb-client.js',
        '!src/datasources/sites/*.js',
        '!src/**/resolver*.js'
    ],
    verbose: true,
    preset: '@shelf/jest-mongodb'
};