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
    // La modal reste ouverte après le rafraîchissement
    // setIsModalOpen reste à true
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
          {card.tags && card.tags.length > 0 && card.tags[0] && (
            <span 
              style={{backgroundColor: card.tags[0].color}} 
              aria-label={card.tags[0].name}
              className="card-tag-indicator"
            >
            </span>
          )}
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