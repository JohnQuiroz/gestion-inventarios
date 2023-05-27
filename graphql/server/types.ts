import { gql } from "graphql-tag";

const typeDefs = gql`
    scalar DateTime

    enum Enum_RoleName {
        ADMIN
        USER
    }

    type User {
        id: ID!
        name: String
        email: String
        emailVerified: DateTime
        image: String
        role: Role
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Role {
        id: ID!
        name: Enum_RoleName
        users: [User]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Material {
        id: ID!
        name: String
        balance: Int
        user: User
        movements: [Movement]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Movement{
        id: ID!
        entry: Int
        out: Int
        user: User
        material: Material
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Query {
        users: [User]
        user(email: String!): User
        materials: [Material]
        materialNames: [Material]
        movements(materialId: String!): [Movement]
    }

    type Mutation {
        updateUser(id: String!, role: String!): User
        createMaterial(id: String, name: String!, balance: Int, createdAt: String, userId: String!): Material
        updateMaterial(id: String!, balance: Int!): Material
        createMovement(id: String, createdAt: String, userId: String!, materialId: String!, entry: Int, out: Int): Movement
    }
`;

export { typeDefs };