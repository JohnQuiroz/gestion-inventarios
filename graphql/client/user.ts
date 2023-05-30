import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
      createdAt
      email
      id
      name
      role {
        id
        name
      }
    }
  }
`;

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      name
      email
      id
      role {
        name
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $role: String!) {
    updateUser(id: $id, role: $role) {
      id
      name
      role {
        name
      }
      updatedAt
    }
  }
`;

export { GET_USERS, GET_USER, UPDATE_USER };
