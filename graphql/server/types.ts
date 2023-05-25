import { gql } from "graphql-tag";

const typeDefs = gql`
    type User {
        id: ID!
        name: String
        email: String
        createdAt: String
        rol: String
        image: String
    }

    type Material {
        id: ID!
        name: String
        balance: Int
        createdAt: String
        userId: String
    }

    type Movement{
        id: ID!
        createdAt: String
        userId: String
        materialId: Int
        incoming: Int
        outcomming: Int
    }

    type Query {
        users: [User]
        user(id: String!): User
        materials: [Material]
        material(id: Int!): Material
        movements: [Movement]
        movement(id: String!): Movement
    }

    type Mutation {
        createUser(id: String!, name: String!, email: String!, createdAt: String, rol: String!, image: String): User
        deleteUser(id: String!): User
        updateUser(id: String!, name: String!, email: String!, createdAt: String, rol: String!, image: String): User
        createMaterial(id: Int!, name: String!, balance: Int!, createdAt: String, userId: String!): Material
        deleteMaterial(id: Int!): Material
        updateMaterial(id: Int!, name: String!, balance: Int!, createdAt: String, userId: String!): Material
        createMovement(id: String!, createdAt: String, userId: String!, materialId: Int!, incoming: Int, outcomming: Int): Movement
        deleteMovement(id: String!): Movement
        updateMovement(id: String!, createdAt: String, userId: String!, materialId: Int!, incoming: Int, outcomming: Int): Movement
    }
`;

export { typeDefs };