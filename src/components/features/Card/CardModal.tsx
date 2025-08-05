import type { ICard } from "../../../@types";
import { InputBehaviour } from "../../ui/InputBehaviour";
import { TagModal } from "../Tag/TagModal";

interface ICardModalProps {
  card: ICard;
  onClose: () => void;
  onUpdateCard: (id: number, content: string, color: string) => Promise<void>;
  onDeleteCard: (id: number) => Promise<void>;
  onRefreshCard?: () => void;
}

export function CardModal({ card, onClose, onUpdateCard, onDeleteCard, onRefreshCard }: ICardModalProps) {
  const handleDelete = async () => {
    await onDeleteCard(card.id);
    onClose();
  };

  const handleTagChange = () => {
    if (onRefreshCard) {
      onRefreshCard();
    }
  };

  return (
    <div className="card-modal box-design">
      <div className="card-modal-details">
        <h3 className="title-modal-card box-design">Détails de la carte</h3>
        <button 
          className="box-design close-modal" 
          onClick={handleDelete}
          aria-label="Supprimer la carte"
        >
          Supprimer
        </button>
        <button 
          className="box-design close-modal" 
          onClick={onClose}
          aria-label="Fermer la modal"
        >
          X
        </button>
      </div>

      <div className="card-modal-tags">
        <TagModal card={card} onTagChange={handleTagChange} />
      </div>
      
      {card.tags && card.tags.length > 0 && (
          <div className="selected-tags-list">
            {card.tags.map((tag) => (
              <span 
                key={tag.id}
                className="selected-tag-item"
                style={{ backgroundColor: tag.color }}
                aria-label={tag.name}
              >
                {tag.name}
              </span>
            ))}
          </div>
      )}
      
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
      
      <button 
        className="box-design close-modal" 
        onClick={onClose}
        aria-label="Fermer la modal"
      >
        Fermer
      </button>
    </div>
  );
} 