import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../routers';


const app = express();
const PORT = 3000;

app.use(express.json());

// tRPC API
app.use('/api/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext: () => ({}),
}));

// health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SCS Conectado API is running',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}` );
  console.log(`📡 Health check: http://localhost:${PORT}/api/health` );
  console.log(`🔌 tRPC endpoint: http://localhost:${PORT}/api/trpc`);
});
