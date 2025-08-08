import { MouseEvent, useState } from "react";
import type { ICard } from "../@types";
import { InputBehaviour } from "./InputBehaviour";

interface ICardModalProps {
  card: ICard;
  onClose: () => void;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
}


export interface ICardProps {
  card: ICard;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
}

export interface ICardsProps {
  cards: ICard[];
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
}

export function CardModal ({card, onClose, onUpdateCard}: ICardModalProps) {
  return (
    <>
      <div className="card-modal box-design">
        <div className="card-modal-details">
        <h3 className="title-modal-card box-design">Détails de la carte</h3>
        <button className=" box-design close-modal" onClick={onClose}>X</button>
        </div>
        <div className="box-design card-modal-info">
          <div style={{ backgroundColor: card.color }} className="modal-update-input">
            <InputBehaviour
                      defaultValue={card.content}
                      onSubmit={(newContent) => onUpdateCard(card.id, newContent, card.color)}
                      showIcon={true}
                      buttonClassName="icon-button"
                      inputClassName="list-title-input"
                      isEditing={false}
                    />
            {/* <p className="card-modal-detail">Titre : {card.content}</p>
            <img className="icon plus-icon" src={Crayon} alt="boutton de modification d'une carte" /> */}
          </div>
          <div style={{ backgroundColor: card.color }} className="modal-update-input">
          <InputBehaviour
                      defaultValue={card.color}
                      onSubmit={(newColor) => onUpdateCard(card.id, card.content, newColor)}
                      showIcon={true}
                      buttonClassName="icon-button"
                      inputClassName="list-title-input"
                      isEditing={false}
                    />
          </div>
        </div>
        <button className=" box-design close-modal" onClick={onClose}>Fermer</button>
      </div>
    </> 
  )
}


export function Card({card, onUpdateCard}: ICardProps) {

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
    {isModalOpen && <CardModal card={card} onClose={closeModal} onUpdateCard={onUpdateCard} />}
  </>
  )
}

export function Cards({cards, onUpdateCard}: ICardsProps) {
  return (
    <>
      {cards.map((card) => {
        return <Card key={card.id} card={card} onUpdateCard={onUpdateCard}/>
      })}
    </>
  )
}