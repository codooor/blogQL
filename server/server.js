import express from "express";
import { config } from "dotenv";
config();

import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import schema from "./schema/schema.js";

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
