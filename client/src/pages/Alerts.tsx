import Header from '../components/Header';
import { trpc } from '../lib/trpc';
import { useState } from 'react';

function Alerts() {
  const { data: alerts, isLoading, refetch } = trpc.alerts.list.useQuery();
  const createAlert = trpc.alerts.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowModal(false);
      setNewAlert({ type: 'theft', description: '', latitude: -15.7942, longitude: -47.8822 });
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: 'theft',
    description: '',
    latitude: -15.7942,
    longitude: -47.8822
  });

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

  const typeLabels: Record<string, string> = {
    theft: 'Furto',
    robbery: 'Roubo',
    medical_emergency: 'Emergência Médica',
    drug_use: 'Uso de Drogas',
    suspicious_individual: 'Indivíduo Suspeito',
    poor_lighting: 'Iluminação Precária',
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000 / 60);
    if (diff < 60) return `${diff} min atrás`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`;
    return `${Math.floor(diff / 1440)}d atrás`;
  };

  const handleSubmit = () => {
    if (newAlert.description.trim()) {
      createAlert.mutate(newAlert);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#FFFEF5',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            color: '#0A1F3D'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Novo Alerta</h3>
            
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Tipo</span>
              <select 
                value={newAlert.type}
                onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #A8C4C9',
                  fontSize: '1rem'
                }}
              >
                {Object.entries(typeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'block', marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Descrição</span>
              <textarea
                value={newAlert.description}
                onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                placeholder="Descreva o incidente..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #A8C4C9',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </label>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#A8C4C9',
                  color: '#0A1F3D',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={createAlert.isPending}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#E8822A',
                  color: '#FFFEF5',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {createAlert.isPending ? 'Criando...' : 'Criar Alerta'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Alertas</h2>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#E8822A',
              color: '#FFFEF5',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            + Novo Alerta
          </button>
        </div>
        
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
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
