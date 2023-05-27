import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
  query Materials {
    materials {
      id
      createdAt
      name
      balance
    }
  }
`;

const GET_MATERIAL_NAMES = gql`
  query MaterialNames {
    materialNames {
      id
      name
      balance
    }
  }
`;

const CREATE_MATERIAL = gql`
  mutation CreateMaterial($name: String!, $userId: String!) {
    createMaterial(name: $name, userId: $userId) {
      id
      name
      createdAt
      balance
    }
  }
`;

const UPDATE_MATERIAL = gql`
  mutation UpdateMaterial($updateMaterialId: String!, $balance: Int!) {
    updateMaterial(id: $updateMaterialId, balance: $balance) {
      id
      name
      balance
      createdAt
      updatedAt
    }
  }
`;

export { GET_MATERIALS, GET_MATERIAL_NAMES, CREATE_MATERIAL, UPDATE_MATERIAL };