import { gql } from "graphql-tag";

const typeDefs = gql`
    scalar DateTime

    export enum Enum_RoleName {
        ADMIN
        USER
    }

    type User {
        id: ID!
        document: String
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
        createdAt: String
        userId: String
    }

    type Movement{
        id: ID!
        createdAt: String
        userId: String
        materialId: Int
        entry: Int
        out: Int
    }

    type Query {
        users: [User]
        user(email: String!): User
        materials: [Material]
        material(id: Int!): Material
        movements: [Movement]
        movement(id: String!): Movement
    }

    type Mutation {
        createUser(id: String!, name: String!, email: String!, createdAt: String, role: String!, image: String): User
        deleteUser(id: String!): User
        updateUser(id: String!, name: String!, email: String!, createdAt: String, role: String!, image: String): User
        createMaterial(id: Int!, name: String!, balance: Int!, createdAt: String, userId: String!): Material
        deleteMaterial(id: Int!): Material
        updateMaterial(id: Int!, name: String!, balance: Int!, createdAt: String, userId: String!): Material
        createMovement(id: String!, createdAt: String, userId: String!, materialId: Int!, entry: Int, out: Int): Movement
        deleteMovement(id: String!): Movement
        updateMovement(id: String!, createdAt: String, userId: String!, materialId: Int!, entry: Int, out: Int): Movement
    }
`;

export { typeDefs };