import { useParams } from 'react-router-dom';
import { Lists, useListsAndCards, InputBehaviour } from '../components';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1', 10);
  
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
    refreshData,
    refreshCardData
  } = useListsAndCards(projectId);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <main className="background-image">
      <Lists 
        lists={lists} 
        onAddCard={handleAddCard} 
        onUpdateList={handleUpdateList} 
        onDeleteList={handleDeleteList} 
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
        onRefreshLists={refreshData}
        onRefreshCardData={refreshCardData}
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
  );
} 