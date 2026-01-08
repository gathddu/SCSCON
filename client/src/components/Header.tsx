import { Link, useLocation } from 'wouter';

function Header() {
  const [location] = useLocation();

  const linkStyle = (path: string) => ({
    color: location === path ? '#E8822A' : '#A8C4C9',
    textDecoration: 'none'
  });

  return (
    <header style={{ 
      padding: '1rem 2rem', 
      borderBottom: '1px solid #A8C4C9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#0A1F3D'
    }}>
      <Link href="/">
        <h1 style={{ fontSize: '1.5rem', color: '#A3A521', cursor: 'pointer' }}>SCS Conectado</h1>
      </Link>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/" style={linkStyle('/')}>Home</Link>
        <Link href="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
        <Link href="/map" style={linkStyle('/map')}>Mapa</Link>
        <Link href="/alerts" style={linkStyle('/alerts')}>Alertas</Link>
      </nav>
    </header>
  );
}

export default Header;
