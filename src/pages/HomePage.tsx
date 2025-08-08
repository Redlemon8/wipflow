import { Link } from 'react-router-dom';

export function HomePage() {
  // Pour l'instant, on simule un projet unique
  // Dans la future version, on aura une liste de projets
  const projects = [
    {
      id: 1,
      name: "Projet Principal",
      description: "Projet Kanban actuel",
      lastModified: new Date().toLocaleDateString('fr-FR')
    }
  ];

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>WipFlow</h1>
        <p className="home-subtitle">Gestionnaire de projets Kanban</p>
        
        <div className="projects-section">
          <h2>Mes Projets</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                to={`/project/${project.id}`} 
                className="project-card box-design"
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="project-date">
                  Modifié le {project.lastModified}
                </span>
              </Link>
            ))}
            
            {/* Carte pour créer un nouveau projet (future fonctionnalité) */}
            <div className="project-card box-design new-project">
              <div className="new-project-content">
                <span className="plus-icon">+</span>
                <p>Nouveau Projet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 