import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo-transparent-png.png';

export function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header>
      <div id="logo-container">
        <Link to="/">
          <img id="logo" src={logo} alt="Logo Wipflow" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            {!isHomePage && !isAuthPage && (
              <Link to="/" className='box-design navButton nav-link'>
                Retour aux projets
              </Link>
            )}
          </li>
          <li>
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className='box-design navButton'>
                  Se déconnecter
                </button>
              </>
            ) : !isAuthPage ? (
              <>
                <Link to="/login" className='box-design nav-link'>
                  Se connecter
                </Link>
                <Link to="/register" className='box-design nav-link'>
                  S'inscrire
                </Link>
              </>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
} 