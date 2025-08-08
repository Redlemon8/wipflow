import { useState, useEffect } from 'react';
import { IList } from '../../@types';
import { 
  addListIntoApi, 
  addCardIntoApi, 
  getLits, 
  updateListIntoApi, 
  deleteListIntoApi, 
  updateCardIntoApi, 
  deleteCardIntoApi
} from '../../api';

export function useListsAndCards() {
  const [lists, setLists] = useState<IList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les données initiales
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newLists = await getLits();
      const listsWithCards = newLists.map(list => ({
        ...list,
        cards: list.cards || []
      }));
      setLists(listsWithCards);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur lors du chargement des données:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ajouter une liste
  const handleAddList = async (title: string): Promise<void> => {
    if (!title.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const position = lists.length + 1;
      const newList = await addListIntoApi(title, position);
      
      if (newList) {
        const listWithCards = {
          ...newList,
          cards: []
        };
        setLists(prevLists => [...prevLists, listWithCards]);
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de la liste');
      console.error('Erreur lors de l\'ajout de la liste:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une carte
  const handleAddCard = async (content: string, list_id: number): Promise<void> => {
    if (!content.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newCard = await addCardIntoApi(content, list_id);
      
      if (newCard) {
        setLists(prevLists => {
          return prevLists.map(list => {
            if (list.id === list_id) {
              return {
                ...list,
                cards: [...(list.cards || []), newCard]
              };
            }
            return list;
          });
        });
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de la carte');
      console.error('Erreur lors de l\'ajout de la carte:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour une liste
  const handleUpdateList = async (newTitle: string, id: number): Promise<void> => {
    if (!newTitle.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const listToUpdate = lists.find(list => list.id === id);
      if (!listToUpdate) return;

      const result = await updateListIntoApi(newTitle, listToUpdate.id);
      
      if (result) {
        setLists(lists.map(list =>
          list.id === id ? { ...list, title: newTitle } : list
        ));
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour de la liste');
      console.error('Erreur lors de la mise à jour de la liste:', err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une liste
  const handleDeleteList = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const listToDelete = lists.find(list => list.id === id);
      if (!listToDelete) return;
   
      const result = await deleteListIntoApi(listToDelete);
      
      if (result) {
        setLists(lists.filter(list => list.id !== id));
      }
    } catch (err) {
      setError('Erreur lors de la suppression de la liste');
      console.error('Erreur lors de la suppression de la liste:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour une carte
  const handleUpdateCard = async (id: number, newContent: string, newColor: string): Promise<void> => {
    if (!newContent.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateCardIntoApi(id, newContent, newColor);

      if (result) {
        setLists(prevLists =>
          prevLists.map(list => ({
            ...list,
            cards: list.cards.map(card => 
              card.id === id 
                ? { ...card, content: newContent, color: newColor } 
                : card
            )
          }))
        );
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour de la carte');
      console.error('Erreur lors de la mise à jour de la carte:', err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une carte
  const handleDeleteCard = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await deleteCardIntoApi(id);
      
      if (result) {
        setLists(prevLists =>
          prevLists.map(list => ({
            ...list,
            cards: list.cards.filter(card => card.id !== id)
          }))
        );
      }
    } catch (err) {
      setError('Erreur lors de la suppression de la carte');
      console.error('Erreur lors de la suppression de la carte:', err);
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir les données d'une carte spécifique (pour les tags)
  const refreshCardData = async (cardId: number): Promise<void> => {
    try {
      const newLists = await getLits();
      const listsWithCards = newLists.map(list => ({
        ...list,
        cards: list.cards || []
      }));
      
      setLists(listsWithCards);
    } catch (err) {
      console.error('Erreur lors du rafraîchissement des données de la carte:', err);
    }
  };

  return { 
    lists, 
    loading, 
    error,
    handleAddList, 
    handleAddCard, 
    handleUpdateList, 
    handleDeleteList, 
    handleUpdateCard, 
    handleDeleteCard,
    refreshData: loadData,
    refreshCardData
  };
} 