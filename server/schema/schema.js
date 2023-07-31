import PostModel from "../models/Posts.js";
import { verifyAdminCredentials } from "../utils/adminHelpers.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

// Queries

const AdminType = new GraphQLObjectType({
  name: "Admin",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    token: { type: GraphQLNonNull(GraphQLString) },
    admin: { type: GraphQLNonNull(AdminType) },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: new GraphQLObjectType({
        name: "Author",
        fields: () => ({
          id: { type: GraphQLID },
          username: { type: GraphQLString },
        }),
      }),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args) {
        return await PostModel.find();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await PostModel.findById(args.id);
      },
    },
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: LoginType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { username, password }) {
        const admin = await verifyAdminCredentials(username, password);

        if (!admin) {
          throw new Error("Invalid credentials!");
        }

        const token = sign(
          { sub: admin.id, role: "admin" },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );

        return { token, admin };
      },
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        if (context.user.role !== "admin") {
          console.log(context.user);
          throw new Error("Denied! You are not an admin!");
        }

        const post = new PostModel({
          title: args.title,
          content: args.content,
          author: { name: context.user.username },
        });
        return await post.save();
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, context) {
        if (context.user.role !== "admin") {
          throw new Error("You cannot delete a post that is not yours!");
        }

        return PostModel.findByIdAndRemove(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
