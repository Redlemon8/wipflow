
import { InputBehaviour } from './components/InputBehaviour';
import { Lists } from './components/DisplayListAndCo';
import './App.css';
import { useListsAndCards } from './components/useListsCardsAndTags';
import { Header } from './components/Header';

function App() {
  const { lists, handleAddList, handleAddCard, handleUpdateList, handleDeleteList } = useListsAndCards();
  return (
    <>
      <Header/>
      <main className="background-image">
        <Lists lists={lists} onAddCard={handleAddCard} onUpdateList={handleUpdateList} onDeleteList={handleDeleteList}/>
        <section className='element-container'>
          <section className='list-container box-design'>
            <InputBehaviour
              defaultValue="Ajouter une liste"
              onSubmit={handleAddList}
              showIcon={true}
              isEditing
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default App;