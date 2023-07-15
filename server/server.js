import express from "express";
import { config } from "dotenv";
config();

import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import expressJwtPackage from "express-jwt";
const expressJwt = expressJwtPackage;

import colors from "colors";
import schema from "./schema/schema.js";

const PORT = process.env.PORT || 5000;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/profile", async (req, res) => {
  const { username, password } = req.body;
  const passwordMatches = await bcrypt.compare(password, PASSWORD);
  console.log(passwordMatches);

  if (username === USERNAME) {
    if (passwordMatches) {
      const token = jwt.sign({ sub: username }, process.env.SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "wrong- try again" });
    }
  }
});

// middleware

app.use(
  expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "not allowed" });
  }
});

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
