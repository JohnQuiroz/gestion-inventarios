import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

export interface Context {
    req: NextApiRequest;
    res: NextApiResponse;
    db: PrismaClient;
}

interface ResolverFunction {
    [key: string]: (parent: any, args: any, context: Context) => Promise<any>;
}

export interface Resolver {
    Query: ResolverFunction;
    Mutation: ResolverFunction;
    [key: string]: ResolverFunction;
}