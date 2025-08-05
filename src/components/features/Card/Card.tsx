import { useState } from "react";
import type { ICard } from "../../../@types";
import { CardModal } from "./CardModal";

interface ICardProps {
  card: ICard;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
  onDeleteCard: (id: number) => Promise<void>;
  onRefreshCard?: () => void;
}

export function Card({ card, onUpdateCard, onDeleteCard, onRefreshCard }: ICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefreshCard = () => {
    if (onRefreshCard) {
      onRefreshCard();
    }
  };

  return (
    <>
      <div className="card-container">
        <button 
          style={{ backgroundColor: card.color }}
          onClick={handleOpenModal}
          aria-label={`Ouvrir les détails de la carte: ${card.content}`}
        >
          {card.content}
        </button>
        <div className="card-tags">
            <span style={{backgroundColor: card.tags[0].color}} aria-label={card.tags[0].name}></span>
        </div>
        <span 
          onClick={handleOpenModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenModal()}
          aria-label="Ouvrir les détails de la carte"
        >
          ...
        </span>
      </div>
      {isModalOpen && (
        <CardModal 
          card={card} 
          onClose={handleCloseModal} 
          onUpdateCard={onUpdateCard} 
          onDeleteCard={onDeleteCard}
          onRefreshCard={handleRefreshCard}
        />
      )}
    </>
  );
} 