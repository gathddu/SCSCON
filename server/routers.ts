import { z } from 'zod';
import { router, publicProcedure } from './_core/trpc';
import { db } from './db';
import { alerts } from '../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() };
  }),

  alerts: router({
    list: publicProcedure.query(async () => {
      const allAlerts = await db.select().from(alerts).orderBy(desc(alerts.createdAt));
      return allAlerts;
    }),

    create: publicProcedure
      .input(z.object({
        type: z.enum(['theft', 'robbery', 'medical_emergency', 'drug_use', 'suspicious_individual', 'poor_lighting']),
        description: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.insert(alerts).values({
          userId: 1,
          category: input.type,
          description: input.description,
          latitude: input.latitude.toString(),
          longitude: input.longitude.toString(),
          status: 'pending',
        });
        
        return { 
          id: Number(result[0].insertId), 
          ...input, 
          status: 'pending', 
          createdAt: new Date() 
        };
      }),
  }),

  stats: publicProcedure.query(async () => {
    const allAlerts = await db.select().from(alerts);
    const activeAlerts = allAlerts.filter(a => a.status === 'pending' || a.status === 'in_progress');
    const resolvedToday = allAlerts.filter(a => {
      if (a.status !== 'resolved') return false;
      const today = new Date();
      const alertDate = new Date(a.updatedAt);
      return alertDate.toDateString() === today.toDateString();
    });

    return {
      activeAlerts: activeAlerts.length,
      resolvedToday: resolvedToday.length,
      activeUsers: 1,
      resolutionRate: allAlerts.length > 0 
        ? Math.round((allAlerts.filter(a => a.status === 'resolved').length / allAlerts.length) * 100)
        : 0,
    };
  }),
});

export type AppRouter = typeof appRouter;
