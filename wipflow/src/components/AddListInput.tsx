import { useState } from "react";
import plus from "../assets/plus.png";

interface ListProps {
  onSubmit: (title: string) => Promise<void>;
}

export function AddListInput({onSubmit}: ListProps) {

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("Ajouter une liste");

  function handleClickAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    if (editMode) {
      if (inputValue.trim() !== '') {
        onSubmit(inputValue);
      }
    }

    setEditMode(!editMode);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onSubmit(inputValue);
      setEditMode(false);
    }
  }

  return (
    
    <>
      {editMode ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setEditMode(false)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditMode(true)}>
          {inputValue}
        </div>
      )}
      <button className="icon-button" onClick={handleClickAdd} >
        {editMode ? 'Enregistrer' : <img className="icon plus-icon" src={plus} alt= "Icon pour créer une liste"/>}
      </button>
    </>
  );
}