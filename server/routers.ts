import { z } from 'zod';
import { router, publicProcedure } from './_core/trpc';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() };
  }),

  alerts: router({
    list: publicProcedure.query(() => {
      // mock
      return [
        { id: 1, type: 'theft', description: 'Furto na Quadra 3', status: 'pending', createdAt: new Date() },
        { id: 2, type: 'suspicious_individual', description: 'Pessoa suspeita na entrada', status: 'in_progress', createdAt: new Date() },
        { id: 3, type: 'poor_lighting', description: 'Iluminação quebrada Bloco B', status: 'resolved', createdAt: new Date() },
      ];
    }),

    create: publicProcedure
      .input(z.object({
        type: z.string(),
        description: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }))
      .mutation(({ input }) => {
        // mock
        return { id: Date.now(), ...input, status: 'pending', createdAt: new Date() };
      }),
  }),

  stats: publicProcedure.query(() => {
    return {
      activeAlerts: 12,
      resolvedToday: 48,
      activeUsers: 156,
      resolutionRate: 89,
    };
  }),
});

export type AppRouter = typeof appRouter;
