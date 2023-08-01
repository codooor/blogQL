import { gql } from "@apollo/client";

const ADMIN_LOGOUT = gql`
  mutation ADMIN_LOGOUT {
    logout
  }
`;

export { ADMIN_LOGOUT };
