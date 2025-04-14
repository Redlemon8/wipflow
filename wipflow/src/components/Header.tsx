export function Header () {
  return (
    <header>
      <div id="logo-container">
        <img id="logo" src="./src/assets/logo-transparent-png.png" />
      </div>
      <nav>
        <ul>
          <li><input className='box-design' type="search" placeholder="Rechercher"/></li>
          <li><span className='box-design create-button'>Créer</span></li>
          <li><span className='box-design'>Espace de travail</span></li>
        </ul>
      </nav>
      </header>
  )
}