import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './_db.js';
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        reviews() {
            return db.reviews;
        },
        authors() {
            return db.authors;
        }
    }
};

//server setup
const server = new ApolloServer({
    // typeDefs
    typeDefs,
    // resolvers
    resolvers
});

const { urls } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log("Server ready at port", 4000);