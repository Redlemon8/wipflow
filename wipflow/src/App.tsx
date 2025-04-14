
import { EditableItem } from './components/EditableItem';
import { Lists } from './components/DisplayListAndCo';
import './App.css';
import { useListsAndCards } from './components/useListsCardsAndTags';
import { Header } from './components/Header';

function App() {
  const { lists, handleAddList, handleAddCard } = useListsAndCards();

  return (
    <>
      <Header />
      <main>
        <Lists lists={lists} onAddCard={handleAddCard} />
        <section className='element-container'>
          <section className='list-container box-design'>
            <EditableItem
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