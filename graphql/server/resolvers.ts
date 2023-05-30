import { Resolver } from 'types';

const resolvers: Resolver = {
  User: {
    role: async (parent, args, context) => {
      const { db } = context;
      const role = await db.role.findUnique({
        where: {
          id: parent.roleId,
        },
      });
      return role;
    },
  },
  Query: {
    users: async (parent, args, context) => {
      const { db, session } = context;
      const userRole = await db.user.findUnique({
        where: {
          email: session?.user?.email ?? '',
        },
        include: {
          role: true,
        },
      });
      const role = userRole?.role?.name;
      if (role === 'ADMIN') {
        const users = await db.user.findMany();
        return users;
      } else {
        return null;
      }
    },
    user: async (parent, args, context) => {
      const { db } = context;
      const user = await db.user.findUnique({
        where: {
          email: args.email,
        },
      });
      return user;
    },
    roles: async (parent, args, context) => {
      const { db } = context;
      const roles = await db.role.findMany();
      return roles;
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
          id: args.id,
        },
      });
      return materials;
    },
    materialBalance: async (parent, args, context) => {
      const { db } = context;
      const material = await db.material.findUnique({
        where: {
          id: args.id,
        },
      });
      return material;
    },
    movements: async (parent, args, context) => {
      const { db } = context;
      const movements = await db.movement.findMany({
        where: {
          materialId: args.materialId,
        },
      });
      return movements;
    },
  },
  Mutation: {
    updateUser: async (parent, args, context) => {
      const { id, role } = args;
      const { db, session } = context;
      const userRole = await db.user.findUnique({
        where: {
          email: session?.user?.email ?? '',
        },
        include: {
          role: true,
        },
      });
      const roleValidation = userRole?.role?.name;
      if (roleValidation !== 'ADMIN') {
        return null;
      }
      const user = await db.user.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
          role: {
            connect: {
              id: role,
            },
          },
        },
      });
      return user;
    },
    createMaterial: async (parent, args, context) => {
      const { name } = args;
      const { db, session } = context;
      const userRole = await db.user.findUnique({
        where: {
          email: session?.user?.email ?? '',
        },
        include: {
          role: true,
        },
      });
      const role = userRole?.role?.name;
      if (role !== 'ADMIN') {
        return null;
      }
      const newMaterial = await db.material.create({
        data: {
          name: name,
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
        },
      });
      return newMaterial;
    },
    updateMaterial: async (parent, args, context) => {
      const { id, balance } = args;
      const { db } = context;
      const material = await db.material.update({
        where: {
          id: id,
        },
        data: {
          balance: balance,
          updatedAt: new Date(),
        },
      });
      return material;
    },
    createMovement: async (parent, args, context) => {
      const { materialId, entry, out } = args;
      const { db, session } = context;
      let balance = 0;
      const material = await db.material.findUnique({
        where: {
          id: materialId,
        },
      });
      if (
        (material?.balance === undefined ||
          material?.balance === null ||
          material?.balance === 0 ||
          material?.balance < out) &&
        out > 0
      ) {
        throw new Error(
          'No hay suficiente material para realizar el movimiento'
        );
      } else {
        balance = material?.balance + entry - out;
      }
      const newMovement = await db.movement.create({
        data: {
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
          material: {
            connect: {
              id: materialId,
            },
          },
          entry: entry,
          out: out,
        },
      });
      await db.material.update({
        where: {
          id: materialId,
        },
        data: {
          balance: balance,
          updatedAt: new Date(),
        },
      });
      return newMovement;
    },
  },
};

export { resolvers };
