
import { InputBehaviour } from './components/InputBehaviour';
import { Lists } from './components/DisplayListAndCo';
import './App.css';
import { useListsAndCards } from './components/useListsCardsAndTags';
import { Header } from './components/Header';

function App() {
  const { lists, handleAddList, handleAddCard, updateList } = useListsAndCards();
  return (
    <>
      <Header/>
      <main className="background-image">
        <Lists lists={lists} onAddCard={handleAddCard} onUpdateList={updateList}/>
        <section className='element-container'>
          <section className='list-container box-design'>
            <InputBehaviour
              defaultValue="Ajouter une liste"
              onSubmit={handleAddList}
              showIcon={true}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default App;