import Header from '../components/Header';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { trpc } from '../lib/trpc';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const statusColors: Record<string, string> = {
  pending: '#E8822A',
  in_progress: '#A3A521',
  resolved: '#A8C4C9',
  false_alarm: '#666666',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  in_progress: 'Em Andamento',
  resolved: 'Resolvido',
  false_alarm: 'Alarme Falso',
};

const categoryLabels: Record<string, string> = {
  theft: 'Furto',
  robbery: 'Roubo',
  medical_emergency: 'Emergência Médica',
  drug_use: 'Uso de Drogas',
  suspicious_individual: 'Indivíduo Suspeito',
  poor_lighting: 'Iluminação Ruim',
};

function Map() {
  const { data: alerts, isLoading } = trpc.alerts.list.useQuery();

  // SCS coordinates
  const scsCenter: [number, number] = [-15.7942, -47.8922];

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main style={{ padding: '1rem', height: 'calc(100vh - 70px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Mapa do SCS</h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E8822A' }}></span>
              Pendente
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#A3A521' }}></span>
              Em Andamento
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#A8C4C9' }}></span>
              Resolvido
            </span>
          </div>
        </div>

        {isLoading ? (
          <p>Carregando mapa...</p>
        ) : (
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: 'calc(100% - 50px)' }}>
            <MapContainer
              center={scsCenter}
              zoom={16}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {alerts?.map(alert => (
                <Marker
                  key={alert.id}
                  position={[Number(alert.latitude), Number(alert.longitude)]}
                  icon={defaultIcon}
                >
                  <Popup>
                    <div style={{
                      minWidth: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <p style={{ fontWeight: 'bold', color: '#0A1F3D', fontSize: '1rem', margin: 0 }}>
                        {categoryLabels[alert.category] || alert.category}
                      </p>
                      <p style={{ color: '#555', fontSize: '0.85rem', margin: 0 }}>
                        {alert.description}
                      </p>
                      <span style={{
                        background: statusColors[alert.status],
                        padding: '0.3rem 0.75rem',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '0.8rem'
                      }}>
                        {statusLabels[alert.status]}
                      </span>
                    </div>
                  </Popup>


                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </main>
    </div>
  );
}

export default Map;
