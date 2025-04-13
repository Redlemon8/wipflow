import type { IList } from "../@types";
import { Card } from "./Card";
import crayon from "../assets/crayon.png" 

interface ListProps {
  list: IList;
}

export interface ListsProps {
  lists: IList[];
}

function List({list}: ListProps) {
  return (
    <section className='element-container'>
      <section className='list-container box-design'>
        <div>{list.title}</div>
        <img className="icon" src={crayon} alt="Crayon d'édition de liste" />
      </section>
      <section className="card-block box-design">
        <div className="card-container">
          {list.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </section>
    </section>
  )
}

export function Lists({lists}: ListsProps) {
  return (
    <>
    {lists.map((list) => {
      return <List key={list.id} list={list} />
    })}
    </>
  )
}