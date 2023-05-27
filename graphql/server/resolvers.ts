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
            const materials = await db.material.findMany();
            return materials;
        },
        materialNames: async (parent, args, context) => {
            const { db } = context;
            const materials = await db.material.findMany({
                where: {
                    id: args.id
                }
            });
            return materials;
        },
        movements: async (parent, args, context) => {
            const { db } = context;
            const materials = await db.movement.findMany({
                where: {
                    id: args.materialId
                }
            });
            return materials;
        }
    },
    Mutation: {
        updateUser: async (parent, args, context) => {
            const { id, role } = args;
            const { db } = context;
            const user = await db.user.update({
                where: {
                    id: id
                },
                data: {
                    updatedAt: new Date(),
                    role: {
                        connect: {
                            id: role
                        }
                    }
                }
            });
            return user;
        },
        createMaterial: async (parent, args, context) => {
            const { name, userId } = args;
            const { db } = context;
            const newMaterial = await db.material.create({
                data: {
                    name,
                    createdBy: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return newMaterial;
        },
        updateMaterial: async (parent, args, context) => {
            const { id, balance } = args;
            const { db } = context;
            const material = await db.material.update({
                where: {
                    id: id
                },
                data: {
                    balance: balance,
                    updatedAt: new Date()
                }
            });
            return material;
        },
        createMovement: async (parent, args, context) => {
            const { userId, materialId, entry, out } = args;
            const { db } = context;
            const newMovement = await db.movement.create({
                data: {
                    createdBy: {
                        connect: {
                            id: userId
                        }
                    },
                    material: {
                        connect: {
                            id: materialId
                        }
                    },
                    entry: entry,
                    out: out
                }
            });
            return newMovement;
        }
    }
};

export { resolvers };