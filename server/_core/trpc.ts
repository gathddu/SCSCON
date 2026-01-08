import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export type Context = {
  user?: { id: number; name: string } | null;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
