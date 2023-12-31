import { gql } from "@apollo/client";

const ADD_POST = gql`
  mutation addPostMutation($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
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
