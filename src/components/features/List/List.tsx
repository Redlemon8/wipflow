import type { IList } from "../../../@types";
import { Card } from "../Card";
import { InputBehaviour } from "../../ui/InputBehaviour";
import Delete from "../../../assets/delete.png";

interface ListProps {
  list: IList;
  onAddCard: (content: string, list_id: number) => Promise<void>;
  onUpdateList: (title: string, id: number) => Promise<void>;
  onDeleteList: (id: number) => Promise<void>;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
  onDeleteCard: (id: number) => Promise<void>;
  onRefreshList?: () => void;
  onRefreshCardData?: (cardId: number) => Promise<void>;
}

export function List({ 
  list, 
  onAddCard, 
  onUpdateList, 
  onDeleteList, 
  onUpdateCard, 
  onDeleteCard,
  onRefreshList,
  onRefreshCardData
}: ListProps) {
  const hasCards = list.cards && list.cards.length > 0;



  return (
    <section className='element-container'>
      {/* LIST STRUCTURE */}
      <section className='list-container box-design'>
        <div className="display-list-items">
          <InputBehaviour
            defaultValue={list.title}
            onSubmit={(newTitle) => onUpdateList(newTitle, list.id)}
            showIcon={true}
            buttonClassName="icon-button"
            inputClassName="list-title-input"
            isEditing={false}
          />
        </div>
        <button 
          type="button" 
          onClick={() => onDeleteList(list.id)}
          aria-label={`Supprimer la liste: ${list.title}`}
        >
          <img 
            className="icon plus-icon" 
            src={Delete} 
            alt="Bouton de suppression d'une liste" 
          />
        </button>
      </section>
      
      {/* CARD STRUCTURE */}
      {hasCards && (
        <section className="card-block box-design">
          <section className="box-design">
            {list.cards.map((card) => (
              <Card 
                key={card.id} 
                card={card} 
                onUpdateCard={onUpdateCard} 
                onDeleteCard={onDeleteCard}
                onRefreshCard={onRefreshCardData ? () => onRefreshCardData(card.id) : undefined}
              />
            ))}
          </section>
        </section>
      )}
      
      {/* ADD CARD STRUCTURE */}
      <section className="card-block box-design">
        <div className="add-card-container">
          <InputBehaviour
            defaultValue="Ajouter une carte"
            onSubmit={(cardTitle) => onAddCard(cardTitle, list.id)}
            inputClassName="card-input"
            buttonClassName="icon icon-button plus-icon"
            showIcon={true}
            isEditing={true}
          />
        </div>
      </section>
    </section>
  );
} 