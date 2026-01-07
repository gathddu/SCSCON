import { Link } from 'wouter';

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header style={{ 
        padding: '1rem 2rem', 
        borderBottom: '1px solid #A8C4C9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '1.5rem', color: '#A3A521' }}>SCS Conectado</h1>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Home</Link>
          <Link href="/dashboard" style={{ color: '#E8822A', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/map" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Mapa</Link>
          <Link href="/alerts" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Alertas</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#A3A521', padding: '1.5rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
            <p>Alertas Ativos</p>
          </div>
          <div style={{ background: '#E8822A', padding: '1.5rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>48</p>
            <p>Resolvidos Hoje</p>
          </div>
          <div style={{ background: '#A8C4C9', padding: '1.5rem', borderRadius: '8px', color: '#0A1F3D' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>156</p>
            <p>Usuários Ativos</p>
          </div>
          <div style={{ background: '#D9D0C1', padding: '1.5rem', borderRadius: '8px', color: '#0A1F3D' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>89%</p>
            <p>Taxa de Resolução</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
