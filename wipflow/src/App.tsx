import { useEffect, useState } from 'react'
import './App.css'
import { Lists } from './components/List'
import { IList } from './@types'
import { addListIntoApi, getLits } from './api';
import plus from "./assets/plus.png";

function App() {

  const [lists, setLists] = useState<IList[]>([]);

  const addList = async(title: string): Promise<void> => {
    const newList = await addListIntoApi(title)
    if (newList) {
      const newLists = [...lists, newList]
      setLists(newLists)
    }
  }

  useEffect(() => {
    console.log("Chargement des données...");
    const loadData = async () => {
      const newLists = await getLits();
      setLists(newLists);
    };
    loadData();
  }, []);

  return (
    <>
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
    <main>
        <Lists lists={lists} />
        <section className='element-container'>
          <section className='list-container box-design'>
            
            <div>Ajouter uen liste</div>
            <img className="icon plus-icon" src={plus} alt= "Icon pour créer une liste"/>
          </section>
        </section>
    </main>
    </>
  )
}

export default App
