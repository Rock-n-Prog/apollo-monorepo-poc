import { PrismaClient } from '.prisma/client/contents';

function createContext() {
  return {
    prisma: new PrismaClient(),
  };
}

type Context = ReturnType<typeof createContext>;

export type { Context };
export { createContext };