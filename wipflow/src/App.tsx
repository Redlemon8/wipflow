import { useEffect, useState } from 'react'
import './App.css'
import { Lists } from './components/List'
import { IList } from './@types'
import { addListIntoApi, getLits } from './api';
import { AddListInput } from './components/AddListInput';

function App() {

  const [lists, setLists] = useState<IList[]>([]);

  // const addList = async(title: string): Promise<void> => {
  //   const newList = await addListIntoApi(title)
  //   if (newList) {
  //     const newLists = [...lists, newList]
  //     setLists(newLists)
  //   }
  // }

  const handleAddList = async(title: string): Promise<void> => {
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

      const listsWithCards = newLists.map(list => ({
        ...list,
        cards: list.cards || []
      }));
      setLists(listsWithCards);
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
            <AddListInput onSubmit={handleAddList}/>
          </section>
        </section>
    </main>
    </>
  )
}

export default App
