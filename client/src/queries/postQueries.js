import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query getPosts {
    posts {
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

export { GET_POSTS };
