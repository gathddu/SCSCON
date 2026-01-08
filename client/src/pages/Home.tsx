import { Link } from 'wouter';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1F3D] text-[#FFFEF5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="text-center">
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#A3A521' }}>
          SCS Conectado
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#FFFEF5' }}>
          Plataforma de Segurança Comunitária
        </p>
        <p style={{ marginTop: '2rem', color: '#A8C4C9' }}>
          In production
        </p>
        <Link href="/dashboard">
          <button style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            background: '#E8822A',
            color: '#FFFEF5',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

