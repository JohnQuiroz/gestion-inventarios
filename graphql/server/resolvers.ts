import { Resolver } from "types";

const resolvers: Resolver = {
    User: {
        role: async (parent, args, context) => {
            const { db } = context;
            const role = await db.role.findUnique({
                where: {
                    id: parent.roleId
                }
            });
            return role;
        }
    },
    Query: {
        users: async (parent, args, context) => {
            const { db } = context;
            const users = await db.user.findMany();
            return users;
        },
        user: async (parent, args, context) => {
            const { db } = context;
            const user = await db.user.findUnique({
                where: {
                    email: args.email
                }
            });
            return user;
        },
        materials: async (parent, args, context) => {
            const { db } = context;
            const users = await db.material.findMany();
            return users;
        },
        material: async (parent, args, context) => {
            const { db } = context;
            const user = await db.material.findUnique({
                where: {
                    id: args.id
                }
            });
            return user;
        },
        movements: async (parent, args, context) => {
            const { db } = context;
            const users = await db.movement.findMany();
            return users;
        },
        movement: async (parent, args, context) => {
            const { db } = context;
            const user = await db.user.findUnique({
                where: {
                    id: args.id
                }
            });
            return user;
        }
    },
    Mutation: {
        updateUser: async (parent, args, context) => {
            const { id, updatedAt, role } = args;
            const { db } = context;
            const user = await db.user.update({
                where: {
                    id: id
                },
                data: {
                    updatedAt,
                    role
                }
            });
            return user;
        },
        createMaterial: async (parent, args, context) => {
            const { id, name, balance, createdAt, userId } = args;
            const { db } = context;
            const newMaterial = await db.material.create({
                data: {
                    id,
                    name,
                    balance,
                    createdAt,
                    userId
                }
            });
            return newMaterial;
        },
        updateMaterial: async (parent, args, context) => {
            const { id, balance, updatedAt } = args;
            const { db } = context;
            const material = await db.material.update({
                where: {
                    id: id
                },
                data: {
                    balance,
                    updatedAt
                }
            });
            return material;
        },
        createMovement: async (parent, args, context) => {
            const { id, userId, materialId, createdAt, entry, out } = args;
            const { db } = context;
            const newMovement = await db.movement.create({
                data: {
                    id,
                    userId,
                    materialId,
                    createdAt,
                    entry,
                    out
                }
            });
            return newMovement;
        }
    }
};

export { resolvers };