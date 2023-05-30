import { gql } from '@apollo/client';

const CREATE_MOVEMENT = gql`
  mutation CreateMovement($out: Int!, $materialId: String!, $entry: Int) {
    createMovement(out: $out, materialId: $materialId, entry: $entry) {
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
      createdAt
      out
      entry
    }
  }
`;

export { CREATE_MOVEMENT, GET_MOVEMENTS };
