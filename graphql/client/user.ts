import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
        createdAt
        email
        id
        name
        role
    }
  }
`;

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
        name
        email
        id
        role{
          name
        }
    }
  }
`;

export { GET_USERS, GET_USER };