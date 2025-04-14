import { useEffect, useState } from "react";
import plus from "../assets/plus.png";

interface EditableItemProps {
  defaultValue: string;
  placeholder?: string;
  onSubmit: (value: string) => Promise<void>;
  buttonClassName?: string;
  inputClassName?: string;
  showIcon?: boolean;
}

export function EditableItem({
  defaultValue,
  placeholder = "Ajouter un élément",
  onSubmit,
  buttonClassName = "icon-button",
  inputClassName = "edit-input",
  showIcon = true
}: EditableItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || placeholder);

  useEffect(() => {
    if (!editMode) {
      setInputValue(defaultValue);
    }
  }, [editMode, defaultValue]);

  // HANDLE INPUT EDIT MODE
  function handleClickAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    if (editMode) {
      if (inputValue.trim() !== '') {
        onSubmit(inputValue);
      }
    }
    
    setEditMode(!editMode);
  }

  //HANDLE KEYBORD VALIDATION VALUE
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onSubmit(inputValue);
      setEditMode(false);
    }
  }

  // CLEAN INPUT FILED WHEN IS SELECTED
  function handleFocus() {
    if (inputValue === defaultValue) {
      setInputValue("");
    }
  }

  // LEAVE EDIT MODE AND GIVE PLACHOLDER VALUE BACK
  function handleBlur() {
    setEditMode(false);
    setInputValue(defaultValue);
  }

  return (
    <>
      {editMode ? (
        <input 
          className={inputClassName}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
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