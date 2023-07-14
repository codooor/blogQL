import { gql } from "@apollo/client";

const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!, $author: String!) {
    addPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export { ADD_POST, DELETE_POST };
