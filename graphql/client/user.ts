import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
        createdAt
        email
        id
        name
        rol
    }
  }
`;

export { GET_USERS };