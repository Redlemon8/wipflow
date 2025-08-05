import { useEffect, useState } from "react";
import { getTags, linkTagToCard, unlinkTagFromCard } from "../../../api";
import { ITag, ICard } from "../../../@types";

interface TagModalProps {
  card: ICard;
  onTagChange?: () => void;
}

export function TagModal({ card, onTagChange }: TagModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      const tags = await getTags();
      setTags(tags);
    };
    loadTags();
  }, []);

  // Initialiser les tags sélectionnés avec ceux de la carte
  useEffect(() => {
    if (card.tags) {
      setSelectedTags(card.tags.map(tag => tag.id));
    }
  }, [card.tags]);

  const handleTagToggle = async (tagId: number) => {
    const isSelected = selectedTags.includes(tagId);
    
    try {
      let success = false;
      
      if (isSelected) {
        // Retirer le tag de la carte
        success = await unlinkTagFromCard(card.id, tagId);
        if (success) {
          setSelectedTags(prev => prev.filter(id => id !== tagId));
        }
      } else {
        // Ajouter le tag à la carte
        success = await linkTagToCard(card.id, tagId);
        if (success) {
          setSelectedTags(prev => [...prev, tagId]);
        }
      }

      if (success && onTagChange) {
        onTagChange();
      }
    } catch (error) {
      console.error("Erreur lors de la modification du tag:", error);
    }
  };

  return (
    <div className="tag-modal">
      <button className="box-design open-tag-modal" onClick={() => setIsOpen(!isOpen)}>
        Étiquettes ({selectedTags.length})
      </button>
      {isOpen && (
        <div className="tag-modal-content">
          <h2 className="tag-modal-content-title">Étiquettes</h2>
          <ul className="tag-modal-content-list">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <li 
                  className="tag-modal-content-list-item" 
                  style={{ backgroundColor: tag.color }} 
                  key={tag.id}
                >
                  <label className="tag-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTagToggle(tag.id)}
                      className="tag-checkbox"
                    />
                    <p className="tag-modal-content-list-item-name">{tag.name}</p>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
