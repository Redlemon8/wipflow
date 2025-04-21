import type { IList } from "../@types";
import { Card } from "./Card";
import { InputBehaviour } from "./InputBehaviour";
import Delete from "../assets/delete.png";


interface ListProps {
  list: IList;
  onAddCard: (content: string, list_id: number, position: number) => Promise<void>;
  onUpdateList: (title: string, id: number) => Promise<void>;
  onDeleteList: (id: number) => Promise<void>;
}

export interface ListsProps {
  lists: IList[];
  onAddCard: (content: string, list_id: number, position: number) => Promise<void>;
  onUpdateList: (title: string, id: number) => Promise<void>;
  onDeleteList: (id: number) => Promise<void>;
}

// DISPLAY LIST WITH CARDS AND TAGS
function List({ list, onAddCard, onUpdateList, onDeleteList }: ListProps) {
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
        <button type="button" onClick={() => onDeleteList(list.id)}>
        <img className="icon plus-icon" src={Delete} alt="boutton de suppréssion d'une liste" />
        </button>
      </section>
      
      {/* CARD STRUCTURE */}
      {hasCards && (
        <section className="card-block box-design">
          <section className="box-design">
            {list.cards.map((card) => (
              <Card key={card.id} card={card}/>
            ))}
          </section>
        </section>
      )}
      
      {/* ADD CARD STRUCTURE */}
      <section className="card-block box-design">
        <div className="add-card-container">
          <InputBehaviour
            defaultValue="Ajouter une carte"
            onSubmit={(cardTitle) => onAddCard(cardTitle, list.id, list.position)}
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

// LOOP ALL LISTS WITH THEIR CARDS AND TAGS
export function Lists({ lists, onAddCard, onUpdateList, onDeleteList }: ListsProps) {
  return (
    <>
      {lists.map((list) => (
        <List key={list.id} list={list} onAddCard={onAddCard} onUpdateList={onUpdateList} onDeleteList={onDeleteList} />
      ))}
    </>
  );
}