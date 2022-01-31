# Severless AWS Lambda Functions with Express and MongoDB Backend

By using Serverless to deploy Lamdba functions to Amazon Web Services (AWS) this project is able to replace the original implementation created in the [MongoDB, React Next.js, and Material UI Demo](https://github.com/romayneeastmond/mongodb-react-nextjs-mui-demo) repository. The cloud based functions use Express to provides the routing logic which then passes data to and from the MongoDB database.

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

## Jest Unit Tests and MongoDB

The tests folder contains a number of unit tests. They are separated into the callbacks and endpoints directories.

Callbacks are basically the integration with the provided test MongoDB. In other words the Express callbacks are testing if the data passed to the serverless functions are correctly making changes to the MongoDB database.

Endpoints are unit tests to ensure that all the expected function endpoints return a status, which in most cases is something either than a 404 Not Found. These unit tests also expect that the Express endpoints only accept the correct request methods.

Finally the coverage report, located in /coverage/lcov-report/index.html shows how much of the Serverless functions are being covered in these unit tests.

## Copyright and Ownership

All terms used are copyright to their original authors.
