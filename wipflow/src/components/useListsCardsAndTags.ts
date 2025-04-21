import { useState, useEffect } from 'react';
import { IList } from '../@types';
import { addListIntoApi, addCardIntoApi, getLits, updateListIntoApi, deleteListIntoApi } from '../api';

export function useListsAndCards() {
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const newLists = await getLits();
      const listsWithCards = newLists.map(list => (
        {
        ...list,
        cards: list.cards || []
      }));
      setLists(listsWithCards);
    };
    loadData();
  }, []);

  // ADD LISTS
  const handleAddList = async (title: string): Promise<void> => {
    const position = lists.length + 1
    const newList = await addListIntoApi(title, position);
    if (newList) {
      const listWithCards = {
        ...newList,
        cards: []
      };
      setLists(prevLists => [...prevLists, listWithCards]);
    }
  };

  // ADD CARDS
  const handleAddCard = async (content: string, list_id: number): Promise<void> => {
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
  };

  // UPDATE LISTS
  const handleUpdateList = async (newTitle: string, id: number): Promise<void> => {
    const listToUpdate = lists.find(list => list.id);
    if (!listToUpdate) return;

    try {

      const result = await updateListIntoApi(newTitle, listToUpdate.id);
      if (result) {
        setLists(lists.map(list =>
          list.id === id ? { ...list, title: newTitle } : list
        ));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste", error);
    }
  }

   // DELETE LISTS
   const handleDeleteList = async (id: number): Promise<void> => {
    const listToDelete = lists.find(list => list.id === id);
    if (!listToDelete) return;
   
    try {
      const result = await deleteListIntoApi(listToDelete);
      if (result) {
        setLists(lists.filter(list => list.id !== id));
      }

    } catch (error) {
      console.error("Erreur lors de la suppréssion de la liste", error);
    }

  }

  return { lists, handleAddList, handleAddCard, handleUpdateList, handleDeleteList };
}