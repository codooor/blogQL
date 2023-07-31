import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
config();
import cors from "cors";
import pkg from "jsonwebtoken";
const { verify } = pkg;

import connectDB from "./config/db.js";

import colors from "colors";
import schema from "./schema/schema.js";

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for checking JWT
app.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.SECRET);
    verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        console.log("Invalid token");
        console.log(token);
      } else {
        res.locals.user = { role: payload.role };
        console.log(payload.role);
      }
    });
    next();
  }
});

//create instance of ApolloServer
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    console.log(token);
    let user = {};
    if (token) {
      try {
        const payload = verify(token, process.env.SECRET);
        user = { username: payload.sub, role: payload.role };
      } catch (error) {
        console.error("Failed to verify token", error);
      }
    }
    return { user };
  },
});

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

startApolloServer();
