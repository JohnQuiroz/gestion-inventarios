import { gql } from '@apollo/client';

const CREATE_MOVEMENT = gql`
  mutation CreateMovement($userId: String!, $materialId: String!, $entry: Int) {
    createMovement(userId: $userId, materialId: $materialId, entry: $entry) {
      id
      entry
      createdAt
      out
    }
  }
`;

const GET_MOVEMENTS = gql`
  query Movements($materialId: String!) {
    movements(materialId: $materialId) {
      id
      out
      entry
    }
  }
`;

export { CREATE_MOVEMENT, GET_MOVEMENTS };
