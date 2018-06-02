import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', {name: String});

const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {Cat} }));

app.use('/test', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen(PORT);