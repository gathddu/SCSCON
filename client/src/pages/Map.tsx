import { Link } from 'wouter';

function Map() {
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
          <Link href="/dashboard" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/map" style={{ color: '#E8822A', textDecoration: 'none' }}>Mapa</Link>
          <Link href="/alerts" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Alertas</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem', height: 'calc(100vh - 70px)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Mapa do SCS</h2>
        
        { /*placeholder map */}
        <div style={{ 
          background: '#D9D0C1', 
          borderRadius: '8px',
          height: 'calc(100% - 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0A1F3D'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mapa Interativo</p>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Integração do Google Maps</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Map;
