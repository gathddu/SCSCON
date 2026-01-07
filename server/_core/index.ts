import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

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
});
