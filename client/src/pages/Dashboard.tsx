import Header from '../components/Header';
import { trpc } from '../lib/trpc';

function Dashboard() {
  const { data: stats, isLoading } = trpc.stats.useQuery();

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h2>
        
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          /* stats cards */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#A3A521', padding: '1.5rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats?.activeAlerts}</p>
              <p>Alertas Ativos</p>
            </div>
            <div style={{ background: '#E8822A', padding: '1.5rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats?.resolvedToday}</p>
              <p>Resolvidos Hoje</p>
            </div>
            <div style={{ background: '#A8C4C9', padding: '1.5rem', borderRadius: '8px', color: '#0A1F3D' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats?.activeUsers}</p>
              <p>Usuários Ativos</p>
            </div>
            <div style={{ background: '#D9D0C1', padding: '1.5rem', borderRadius: '8px', color: '#0A1F3D' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats?.resolutionRate}%</p>
              <p>Taxa de Resolução</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
