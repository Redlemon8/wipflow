import type { ICard } from "../@types";

export interface ICardProps {
  card: ICard;
}

export interface ICardsProps {
  cards: ICard[];
}


export function Card({card}: ICardProps) {
  return (
    <>
        <button style={{ backgroundColor: card.color }}>{card.content}</button>
    </>
  )
}

export function Cards({cards}: ICardsProps) {
  return (
    <>
      {cards.map((card) => {
        return <Card key={card.id} card={card} />
      })}
    </>
  )
}