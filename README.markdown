# Severless Framework AWS Lambda Functions with Express, Apollo GraphQL, MongoDB, and Jest

By using Serverless Framework to deploy Lamdba functions to Amazon Web Services (AWS) this project is able to replace the original implementation created in the [MongoDB, React Next.js, and Material UI Demo](https://github.com/romayneeastmond/mongodb-react-nextjs-mui-demo) repository.

The Serverless API endpoints are produced by Express. Each endpoint interacts with MongoDB based on the action, method, and data. [Apollo GraphQL](#Apollo) provides a query language for this API. It also indirectly documents what the endpoints are and what kind of data can be returned from each query or mutation.

Finall [Jest](#Jest) is used for creating a suite of unit tests for the API endpoints and also the underlying way in how data flows through the database.

## How to Use

This project requires that Serverless be installed as a global package.

```
npm install -g serverless
```

Run an npm install or update

```
npm i
```

Complete the following steps

1. Create a new application from the Serverless Dashboard then within the settings > parameters section; define the MONGODB_URI entry with the connection string of the MongoDB database

1. Ensure that the MongoDB database has the necessary IP addresses whitelisted for requests that go through the MongoClient

1. Deploy the project to CloudFormation using an applicable AWS provider by running

```
serverless deploy
```

The above should output the API endpoints and functions that are available for consumption. Any API testing platform such as Postman, Thunder Client, or the browser can be used on the following definitions.

### Endpoints

| Method | API                                                                   |
| ------ | --------------------------------------------------------------------- |
| POST   | https://YOUR_HTML.execute-api.YOUR_REGION.amazonaws.com/STAGE/graphql |
| ANY    | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com              |
| POST   | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/sites/add    |
| DELETE | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/sites/delete |
| GET    | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/sites/get    |
| GET    | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/sites/list   |
| PUT    | https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/sites/update |

### Functions

| Serverless       | AWS Lamdba                     |
| ---------------- | ------------------------------ |
| hello            | aws-sites-dev-hello            |
| graphql          | aws-sites-dev-graphql          |
| sites-dev-add    | aws-sites-dev-sites-dev-add    |
| sites-dev-delete | aws-sites-dev-sites-dev-delete |
| sites-dev-get    | aws-sites-dev-sites-dev-get    |
| sites-dev-list   | aws-sites-dev-sites-dev-list   |
| sites-dev-update | aws-sites-dev-sites-dev-update |

Functions can be invoked from the Serverless Dashboard or locally (browser or command line) by running either of the following

```
serverless offline start
```

```
serverless invoke local -function SERVERLESS_FUNCTION_NAME
```

## <a name="Apollo"></a>Apollo GraphQL and Serverless

There are 3 ways of accessing the Apollo GraphQL functionality.

1. Apollo GraphQL Explorer Sandbox
1. Apollo GraphQL Playground (local)
1. Serverless Apollo GraphQL

The above ways of interacting with Apollo GraphQL depend on running in conjunction with Serverless. Start a local instance of the API endpoints.

```
serverless offline start
```

Optionally start Explorer Sandbox or Playground by running either command found below. Note that by default both instances bind to port 4000, at http://localhost:4000/graphql . They also read the .env file for the **LAMBDA_FUNCTIONS_URI** environment variable which by default points to http://localhost:3000/

```
npm run apollo-server
```

```
npm run apollo-playground
```

### Serverless Apollo GraphQL

The local endpoint is http://localhost:3000/dev/graphql and it accepts operations (query or mutation) using the POST method. **Before** using this method of accessing the API do the following:

1. Create a **.env.development** file and define the **LAMBDA_FUNCTIONS_URI** environment variable
1. Create a **.env.production** file and define the **LAMBDA_FUNCTIONS_URI** environment

Naturally these variables should point to either http://localhost:3000/ or https://YOUR_API.execute-api.-YOUR_REGION-.amazonaws.com/

The production environment variable is only used if deploying using the following

```
serverless deploy --stage production
```

## <a name="Jest"></a>Jest Unit Tests, Express, and MongoDB

The /tests folder contains a number of unit tests. They are separated into the callbacks and endpoints directories.

Callbacks are basically the integration with the provided test MongoDB database. In other words the Express callbacks are testing if the data passed to the Serverless functions are correctly making changes to the test database collection.

The test MongoDB database is provided by [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server/).

Endpoints are unit tests, ensuring that all the expected URLs return a status, which in most cases is something either than a 404 Not Found. These unit tests also expect that the Express endpoints only accept the correct request method, i.e. GET, POST, etc.

The Express endpoints are simulated by [supertest](https://www.npmjs.com/package/supertest/).

Finally the coverage report, located in /coverage/lcov-report/index.html shows how much of the Serverless functions are being covered in these unit tests.

## Copyright and Ownership

All terms used are copyright to their original authors.
