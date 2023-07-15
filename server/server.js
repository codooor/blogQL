import express from "express";
import { config } from "dotenv";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import colors from "colors";
import schema from "./schema/schema.js";

config();

const PORT = process.env.PORT || 5000;
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    context: { user: res.locals.user },
  }))
);

const salt = bcrypt.genSaltSync(10);
const hashedPASSWORD = bcrypt.hashSync(PASSWORD, salt);

app.post("/profile", async (req, res) => {
  const { username, password } = req.body;

  const passwordMatches = await bcrypt.compare(password, hashedPASSWORD);

  if (username === process.env.USER_NAME && passwordMatches) {
    const token = jwt.sign({ sub: username }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Wrong credentials, try again" });
  }
});

// Middleware for checking JWT
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Authorization header required" });
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.locals.user = payload.sub;
    next();
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "not allowed" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
