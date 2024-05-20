import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema";

//server setup
const server = new ApolloServer({
    // typeDefs
    typeDefs
    // resolvers
});

const { urls } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log("Server ready at port", 4000);