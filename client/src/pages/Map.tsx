import Header from '../components/Header';

function Map() {
  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main style={{ padding: '2rem', height: 'calc(100vh - 70px)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Mapa do SCS</h2>
        
        {/* placeholder map */}
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
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Google Maps será integrado aqui</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Map;
