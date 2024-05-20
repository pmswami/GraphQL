import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './_db.js';
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id);
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id);
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id);
        }
    }
    // Game: {
    //     reviews(parent) {
    //         return db.reviews.filter((r) => r.game_id === parent.id);
    //     }
    // },
    // Review: {
    //     author(parent) {
    //         return db.authors.find((a) => a.id === parent.author_id);
    //     },
    //     game(parent) {
    //         return db.games.find((g) => g.id === parent.game_id);
    //     }
    // },
    // Author: {
    //     reviews(parent) {
    //         return db.reviews.filter((r) => r.author_id === parent.id);
    //     }
    // },
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