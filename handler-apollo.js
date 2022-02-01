const { ApolloServer, gql } = require('apollo-server-lambda');
const fs = require('fs');
const SitesService = require('./src/datasources/sites/sitesService');

const server = new ApolloServer({
    typeDefs: gql(
        fs.readFileSync('./src/schema/sites/schema.graphql', { encoding: 'utf8' })
    ),
    resolvers: require('./src/schema/sites/resolvers'),
    dataSources: () => {
        return {
            sitesService: new SitesService(process.env.LAMBDA_FUNCTIONS_URI)
        }
    }
});

module.exports = {
    handler: server.createHandler()
}