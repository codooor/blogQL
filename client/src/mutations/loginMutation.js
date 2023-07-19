import { gql } from "@apollo/client";

const ADMIN_LOGIN = gql`
  mutation ADMIN_LOGIN($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      admin {
        id
        username
      }
    }
  }
`;

export { ADMIN_LOGIN };
