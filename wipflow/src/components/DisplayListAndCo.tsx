import type { IList } from "../@types";
import { Card } from "./Card";
import crayon from "../assets/crayon.png";
import { EditableItem } from "./EditableItem";

interface ListProps {
  list: IList;
  onAddCard: (content: string, list_id: number) => Promise<void>;
}

export interface ListsProps {
  lists: IList[];
  onAddCard: (content: string, list_id: number) => Promise<void>;
}

// DISPLAY LIST WITH CARDS AND TAGS
function List({ list, onAddCard }: ListProps) {
  const hasCards = list.cards && list.cards.length > 0;

  return (
    <section className='element-container'>
      {/* LIST STRUCTURE */}
      <section className='list-container box-design'>
        <div>{list.title}</div>
        <img className="icon" src={crayon} alt="Crayon d'édition de liste" />
      </section>
      
      {/* CARD STRUCTURE */}
      {hasCards && (
        <section className="card-block box-design">
          <section className="card-container box-design">
            {list.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </section>
        </section>
      )}
      
      {/* ADD CARD STRUCTURE */}
      <section className="card-block box-design">
        <div className="add-card-container">
          <EditableItem
            defaultValue="Ajouter une carte"
            onSubmit={(cardTitle) => onAddCard(cardTitle, list.id)}
            inputClassName="card-input"
            buttonClassName="icon icon-button plus-icon"
            showIcon={true}
          />
        </div>
      </section>
    </section>
  );
}

// LOOP ALL LISTS WITH THEIR CARDS AND TAGS
export function Lists({ lists, onAddCard }: ListsProps) {
  return (
    <>
      {lists.map((list) => (
        <List key={list.id} list={list} onAddCard={onAddCard} />
      ))}
    </>
  );
}