import type { IList } from "../../../@types";
import { List } from "./List";

export interface ListsProps {
  lists: IList[];
  onAddCard: (content: string, list_id: number) => Promise<void>;
  onUpdateList: (title: string, id: number) => Promise<void>;
  onDeleteList: (id: number) => Promise<void>;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
  onDeleteCard: (id: number) => Promise<void>;
  onRefreshLists?: () => void;
  onRefreshCardData?: (cardId: number) => Promise<void>;
}

export function Lists({ 
  lists, 
  onAddCard, 
  onUpdateList, 
  onDeleteList, 
  onUpdateCard, 
  onDeleteCard,
  onRefreshLists,
  onRefreshCardData
}: ListsProps) {
  const handleRefreshLists = () => {
    if (onRefreshLists) {
      onRefreshLists();
    }
  };

  return (
    <>
      {lists.map((list) => (
        <List 
          key={list.id} 
          list={list} 
          onAddCard={onAddCard} 
          onUpdateList={onUpdateList} 
          onDeleteList={onDeleteList} 
          onUpdateCard={onUpdateCard} 
          onDeleteCard={onDeleteCard}
          onRefreshList={handleRefreshLists}
          onRefreshCardData={onRefreshCardData}
        />
      ))}
    </>
  );
} 