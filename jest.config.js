module.exports = {
    roots: [
        '<rootDir>/tests',
        '<rootDir>/src',
        '<rootDir>/lib'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'handler.js',
        'src/**/*.js',
        'lib/**/*.js',
        '!lib/mongodb-client.js'
    ],
    verbose: true
};