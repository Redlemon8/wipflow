import { useEffect, useState } from "react";
import plus from "../../assets/plus.png";
import crayon from "../../assets/crayon.png";

interface InputBehaviourProps {
  defaultValue: string;
  placeholder?: string;
  onSubmit: (value: string) => Promise<void>;
  buttonClassName?: string;
  inputClassName?: string;
  showIcon?: boolean;
  isEditing?: boolean;
}

export function InputBehaviour({
  defaultValue,
  placeholder = "Ajouter un élément",
  onSubmit,
  buttonClassName = "icon-button",
  inputClassName = "edit-input",
  showIcon = true,
  isEditing = false
}: InputBehaviourProps) {
  const [editMode, setEditMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || placeholder);

  // Reset input value when edit mode changes
  useEffect(() => {
    if (!editMode) {
      setInputValue(defaultValue);
    } 
  }, [editMode, defaultValue]);

  // Reset input value when update mode changes
  useEffect(() => {
    if (!updateMode) {
      setInputValue(defaultValue);
    } 
  }, [updateMode, defaultValue]);

  // Handle keyboard validation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onSubmit(inputValue);
      setEditMode(false);
      setUpdateMode(false);
    }
  };

  // Clear input field when focused
  const handleFocus = () => {
    if (inputValue === defaultValue) {
      setInputValue("");
    }
  };

  // Leave edit mode and restore placeholder value
  const handleBlur = () => {
    setEditMode(false);
    setUpdateMode(false);
    setInputValue(defaultValue);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Editing mode (for adding new items)
  if (isEditing) {
    const handleClickAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      if (editMode) {
        if (inputValue.trim() !== '') {
          await onSubmit(inputValue);
        }
      }
      
      setEditMode(!editMode);
    };

    return (
      <>
        {editMode ? (
          <input 
            className={inputClassName}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Ajouter un titre"
            autoFocus
          />
        ) : (
          <div onClick={() => setEditMode(true)}>
            {inputValue}
          </div>
        )}
        <button className={buttonClassName} onClick={handleClickAdd}>
          {editMode ? 'Enregistrer' : 
            showIcon ? <img className="icon plus-icon" src={plus} alt="Icon pour ajouter un élément"/> : 'Ajouter'}
        </button>
      </>
    );
  }

  // Update mode (for editing existing items)
  const handleClickUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (updateMode) {
      if (inputValue.trim() !== '') {
        await onSubmit(inputValue);
      }
    }
    setUpdateMode(!updateMode);
  };

  return (
    <>
      {updateMode ? (
        <input 
          className={inputClassName}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Modifier le titre"
          autoFocus
        />
      ) : (
        <div onClick={() => setUpdateMode(true)}>
          {inputValue}
        </div>
      )}
      <button className={buttonClassName} onClick={handleClickUpdate}>
        {updateMode ? 'Enregistrer' : 
        showIcon ? <img className="icon plus-icon" src={crayon} alt="Icon pour modifier le titre"/> : 'Modifier'}
      </button>
    </>
  );
} 