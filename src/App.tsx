
import { InputBehaviour, Lists, useListsAndCards, Header } from './components';
import './App.css';

function App() {
  const { 
    lists, 
    loading, 
    error,
    handleAddList, 
    handleAddCard, 
    handleUpdateList, 
    handleDeleteList, 
    handleUpdateCard,
    handleDeleteCard,
    refreshData
  } = useListsAndCards();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <>
      <Header />
      <main className="background-image">
        <Lists 
          lists={lists} 
          onAddCard={handleAddCard} 
          onUpdateList={handleUpdateList} 
          onDeleteList={handleDeleteList} 
          onUpdateCard={handleUpdateCard}
          onDeleteCard={handleDeleteCard}
          onRefreshLists={refreshData}
        />
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