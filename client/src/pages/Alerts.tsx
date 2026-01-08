import Header from '../components/Header';
import { trpc } from '../lib/trpc';

function Alerts() {
  const { data: alerts, isLoading } = trpc.alerts.list.useQuery();

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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000 / 60);
    if (diff < 60) return `${diff} min atrás`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`;
    return `${Math.floor(diff / 1440)}d atrás`;
  };

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

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
        
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          /* Alerts List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alerts?.map(alert => (
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
                  <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>{formatTime(alert.createdAt)}</p>
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
        )}
      </main>
    </div>
  );
}

export default Alerts;
