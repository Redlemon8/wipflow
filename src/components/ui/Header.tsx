import logo from '../../assets/logo-transparent-png.png';

export function Header() {
  return (
    <header>
      <div id="logo-container">
        <img id="logo" src={logo} alt="Logo Wipflow" />
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
            <span className='box-design'>Espace de travail</span>
          </li>
        </ul>
      </nav>
    </header>
  );
} 