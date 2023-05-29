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
    }
  }
`;

const GET_MATERIAL_BALANCE = gql`
  query MaterialBalance($id: String!) {
    materialBalance(id: $id) {
      balance
    }
  }
`;

const CREATE_MATERIAL = gql`
  mutation CreateMaterial($name: String!) {
    createMaterial(name: $name) {
      id
      name
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

export { GET_MATERIALS, GET_MATERIAL_NAMES, GET_MATERIAL_BALANCE, CREATE_MATERIAL, UPDATE_MATERIAL };