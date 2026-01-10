import { z } from 'zod';
import { router, publicProcedure } from './_core/trpc';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() };
  }),

  alerts: router({
    list: publicProcedure.query(() => {
      return [
        { id: 1, type: 'theft', description: 'Furto na Quadra 3', status: 'pending', latitude: -15.7942, longitude: -47.8922, createdAt: new Date() },
        { id: 2, type: 'suspicious_individual', description: 'Pessoa suspeita na entrada', status: 'in_progress', latitude: -15.7935, longitude: -47.8880, createdAt: new Date() },
        { id: 3, type: 'poor_lighting', description: 'Iluminação quebrada Bloco B', status: 'resolved', latitude: -15.7950, longitude: -47.8900, createdAt: new Date() },
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
