import { useState } from 'react';
import { trpc } from '../lib/trpc';

const alertTypes = [
  { value: 'theft', label: 'Furto', icon: '💰' },
  { value: 'robbery', label: 'Roubo', icon: '🔫' },
  { value: 'medical_emergency', label: 'Emergência Médica', icon: '🏥' },
  { value: 'drug_use', label: 'Uso de Drogas', icon: '💊' },
  { value: 'suspicious_individual', label: 'Indivíduo Suspeito', icon: '👤' },
  { value: 'poor_lighting', label: 'Iluminação Ruim', icon: '💡' },
];

function PanicButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [success, setSuccess] = useState(false);

  const createAlert = trpc.alerts.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        setLocation(null);
      }, 2000);
    },
  });

  const handlePanicClick = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
          setIsOpen(true);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // fallback to SCS center if GPS fails
          setLocation({ lat: -15.7942, lng: -47.8922 });
          setIsLocating(false);
          setIsOpen(true);
        }
      );
    } else {
      // fallback if geolocation not supported
      setLocation({ lat: -15.7942, lng: -47.8922 });
      setIsLocating(false);
      setIsOpen(true);
    }
  };

  const handleSelectType = (type: string) => {
    if (!location) return;
    
    createAlert.mutate({
      type: type as any,
      description: `Alerta de emergência - ${alertTypes.find(t => t.value === type)?.label}`,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  return (
    <>
      {/* floating panic button */}
      <button
        onClick={handlePanicClick}
        disabled={isLocating}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: isLocating ? '#666' : '#E8822A',
          border: '4px solid #FFFEF5',
          color: '#FFFEF5',
          fontSize: '2rem',
          cursor: isLocating ? 'wait' : 'pointer',
          boxShadow: '0 4px 20px rgba(232, 130, 42, 0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!isLocating) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(232, 130, 42, 0.7)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(232, 130, 42, 0.5)';
        }}
      >
        {isLocating ? '📍' : '🚨'}
      </button>

      {/* modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => !createAlert.isPending && setIsOpen(false)}
        >
          <div
            style={{
              background: '#0A1F3D',
              padding: '2rem',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '400px',
              border: '2px solid #E8822A',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div style={{ textAlign: 'center', color: '#A3A521' }}>
                <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Alerta Enviado</p>
                <p style={{ color: '#A8C4C9', marginTop: '0.5rem' }}>Ajuda está a caminho</p>
              </div>
            ) : (
              <>
                <h2 style={{ color: '#E8822A', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem' }}>
                  Qual é a emergência?
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {alertTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleSelectType(type.value)}
                      disabled={createAlert.isPending}
                      style={{
                        padding: '1rem',
                        background: '#FFFEF5',
                        color: '#0A1F3D',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: createAlert.isPending ? 'wait' : 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    marginTop: '1.5rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    color: '#A8C4C9',
                    border: '1px solid #A8C4C9',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PanicButton;
