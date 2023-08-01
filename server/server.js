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
  const path = req.path;

  // Skip JWT verification for login and any other routes that don't require authentication
  const publicPaths = ["/login"]; // Add any other public paths here
  if (publicPaths.includes(path)) {
    return next();
  }

  // JWT verification code
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]; // extract token from header

    if (token) {
      verify(token, process.env.SECRET, (err, payload) => {
        if (err) {
          console.log(err);
          console.log("Invalid token");
          console.log(token);
        } else {
          res.locals.user = { role: payload.role };
          console.log(payload.role);
          next();
        }
      });
    }
  } else {
    next();
  }
});

//create instance of ApolloServer
const server = new ApolloServer({
  schema,
  context: ({ res }) => {
    return { user: res.locals.user || {} };
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
