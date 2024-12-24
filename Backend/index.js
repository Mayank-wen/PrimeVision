const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const depthLimit = require("graphql-depth-limit");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const models = require("./models");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4001;
console.log(typeDefs);
console.log(typeof connectDB);
console.log(resolvers);
const cors = require('cors');
app.use(cors())
const getUser = (token) => {
  if (token && token !== 'null') {
      try {
          return jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
          console.log("Token verification failed:", err);
          return null;
      }
  }
  return null;
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5)],
    context: async ({ req }) => {
        // Get token from headers
        const token = req.headers.authorization?.split('Bearer ')[1];
        const user = token ? await getUser(token) : null;
        return { models, user };
    }
});
const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MongoUser}:${process.env.MongoPass}@cluster0.1rghv.mongodb.net/${process.env.Mongodata}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected successfully");
    await server.start();
    server.applyMiddleware({ app, path: "/api" });
    app.listen(port, () => {
      console.log(
        `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};
startServer();