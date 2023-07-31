import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
config();
import cors from "cors";
import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

import connectDB from "./config/db.js";

import colors from "colors";
import schema from "./schema/schema.js";

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await verifyAdminCredentials(username, password);

  if (admin) {
    // Admin credentials are correct
    const payload = {
      sub: admin.username,
      role: "admin",
    };
    const secret = process.env.SECRET;
    const token = sign(payload, secret);

    res.json({ token });
  } else {
    // Admin credentials are incorrect
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware for checking JWT
app.use((req, res, next) => {
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
  }
});

//create instance of ApolloServer
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    let user = {};

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1]; // extract token from header

      if (token) {
        try {
          const payload = verify(token, process.env.SECRET);
          user = { username: payload.sub, role: payload.role };
        } catch (error) {
          console.error("Failed to verify token", error);
        }
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
