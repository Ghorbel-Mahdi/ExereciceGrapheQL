import { GraphQLServer, PubSub } from "graphql-yoga";
import { Query } from "./resolvers/Query.mjs";
import { Mutation } from "./resolvers/Mutation.mjs";
import { Subscription } from "./resolvers/Subscription.mjs";
import { Todo } from "./resolvers/Todo.mjs";
import { User } from "./resolvers/User.mjs";

import { db } from "./db/db.mjs";

const typeDefs = "src/schema/schema.graphql";
const pubsub = new PubSub();
// Implémentation de notre contrat
const resolvers = {
  Mutation,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db,
    pubsub,
  },
});

const t = {
  query: "query todos($limit: Int!) { id name }",
  operationName: "getTodos",
  variables: { limit: "5" },
};

const options = {
  cors: {
    origin: "http://localhost:4200",
    credentials: true, // <-- REQUIRED backend setting
  },
};
server.start(options, () => console.log("running on localhost:4000"));
