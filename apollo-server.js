const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const fs = require('fs');
const SitesService = require('./src/datasources/sites/sitesService');
require('dotenv').config();

(async () => {
    const app = express();

    const httpServer = http.createServer(app);

    const typeDefs = gql(fs.readFileSync('./src/schema/sites/schema.graphql', { encoding: 'utf8' }));
    const resolvers = require('./src/schema/sites/resolvers');

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                sitesService: new SitesService(process.env.LAMBDA_FUNCTIONS_URI)
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();