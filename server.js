const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("successfully connect to the database Atlas"))
  .catch((err) => console.log(`error connecting to the database Atlas ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    return context;
  },
  cors: true,
});
app.use(express.static(__dirname + "/build"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(`🚀 apolloServer Server ready at  ${PORT}`)
  );
});
