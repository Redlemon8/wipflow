import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo-transparent-png.png';

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
            <input 
              className='box-design' 
              type="search" 
              placeholder="Rechercher"
              aria-label="Rechercher"
            />
          </li>
          <li>
            <span className='box-design create-button'>Créer</span>
          </li>
          <li>
            {!isHomePage && (
              <Link to="/" className='box-design nav-link'>
                Retour aux projets
              </Link>
            )}
            {isHomePage && (
              <span className='box-design'>Espace de travail</span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
} 