import { useState, useEffect } from 'react';
import { IList } from '../@types';
import { addListIntoApi, addCardIntoApi, getLits } from '../api';

export function useListsAndCards() {
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
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

  // ADD LISTS
  const handleAddList = async (title: string): Promise<void> => {
    const newList = await addListIntoApi(title);
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
      // Mettre à jour la liste spécifique avec la nouvelle carte
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

  return { lists, handleAddList, handleAddCard };
}