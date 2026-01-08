import { Link } from 'wouter';
import { useState } from 'react';

function Alerts() {
  const [alerts] = useState([
    { id: 1, type: 'theft', description: 'Furto na Quadra 3', status: 'pending', time: '10 min atrás' },
    { id: 2, type: 'suspicious_individual', description: 'Pessoa suspeita na entrada', status: 'in_progress', time: '25 min atrás' },
    { id: 3, type: 'poor_lighting', description: 'Iluminação quebrada Bloco B', status: 'resolved', time: '1h atrás' },
    { id: 4, type: 'medical_emergency', description: 'Emergência médica no estacionamento', status: 'resolved', time: '2h atrás' },
  ]);

  const statusColors: Record<string, string> = {
    pending: '#E8822A',
    in_progress: '#A3A521',
    resolved: '#A8C4C9',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido',
  };

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
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
          <Link href="/map" style={{ color: '#A8C4C9', textDecoration: 'none' }}>Mapa</Link>
          <Link href="/alerts" style={{ color: '#E8822A', textDecoration: 'none' }}>Alertas</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Alertas</h2>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#E8822A',
            color: '#FFFEF5',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            + Novo Alerta
          </button>
        </div>
        
        {/* Alerts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map(alert => (
            <div key={alert.id} style={{ 
              background: '#D9D0C1', 
              padding: '1.5rem', 
              borderRadius: '8px',
              color: '#0A1F3D',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{alert.description}</p>
                <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>{alert.time}</p>
              </div>
              <span style={{ 
                background: statusColors[alert.status], 
                padding: '0.5rem 1rem', 
                borderRadius: '20px',
                color: '#FFFEF5',
                fontSize: '0.9rem'
              }}>
                {statusLabels[alert.status]}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Alerts;
