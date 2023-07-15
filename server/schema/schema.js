import PostModel from "../models/Posts.js";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

// Queries

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
          name: { type: GraphQLString },
        }),
      }),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return PostModel.find();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return PostModel.findById(args.id);
      },
    },
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
      },
      resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Denied!");
        }

        const post = new PostModel({
          title: args.title,
          content: args.content,
          author: { name: args.author || "Unknown Author" },
          createdAt: args.createdAt,
          updatedAt: args.updatedAt,
        });
        return post.save();
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, context) {
        if (!context.user) {
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
