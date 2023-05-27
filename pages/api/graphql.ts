import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from 'graphql/server/resolvers';
import { typeDefs } from 'graphql/server/types';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Context } from 'types';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const serverHandler = startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);
      return {
        req,
        res,
        db: prisma,
        session,
      };
    },
  }
);

const graphQlServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session && process.env.NODE_ENV === 'production') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  await serverHandler(req, res);
};

export default graphQlServer;
