import { MouseEvent, useState } from "react";
import type { ICard } from "../@types";

interface ICardModalProps {
  card: ICard;
  onClose: () => void;
}


export interface ICardProps {
  card: ICard;
}

export interface ICardsProps {
  cards: ICard[];
}

export function CardModal ({card, onClose}: ICardModalProps) {
  return (
    <>
      <div className="card-modal box-design">
        <div className="card-modal-details">
        <h3 className="title-modal-card box-design">Détails de la carte</h3>
        <button className=" box-design close-modal" onClick={onClose}>X</button>
        </div>
        <div className="box-design card-modal-info">
          <p className="card-modal-detail" style={{ backgroundColor: card.color }}>Titre : {card.content}</p>
          <p className="card-modal-detail" style={{ backgroundColor: card.color }}>Color : {card.color}</p>
        </div>
        <button className=" box-design close-modal" onClick={onClose}>Fermer</button>
      </div>
    </> 
  )
}


export function Card({card}: ICardProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
  <>
    <div className="card-container">
      <button style={{ backgroundColor: card.color }}>{card.content}</button>
      <span onClick={openModal}>...</span>
    </div>
    {isModalOpen && <CardModal card={card} onClose={closeModal} />}
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