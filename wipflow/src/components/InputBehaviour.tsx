import { useEffect, useState } from "react";
import plus from "../assets/plus.png";
import crayon from "../assets/crayon.png";

interface InputBehaviourProps {
  defaultValue: string;
  placeholder?: string;
  onSubmit: (value: string) => Promise<void>;
  buttonClassName?: string;
  inputClassName?: string;
  showIcon?: boolean;
  isEditing?: boolean,
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
  // const [deleteMode, setDeleteMode] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || placeholder);

  //EDIT USEEFFECT 
  useEffect(() => {
    if (!editMode) {
      setInputValue(defaultValue);
    } 
  }, [editMode, defaultValue]);

  //UPDATE USEEFFECT
  useEffect(() => {
    if (!updateMode) {
      setInputValue(defaultValue);
    } 
  }, [updateMode, defaultValue]);

  //HANDLE KEYBORD VALIDATION VALUE
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onSubmit(inputValue);
      setEditMode(false);
      setUpdateMode(false);
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
    setUpdateMode(false);
    setInputValue(defaultValue);
  }

  // HANDLE INPUT EDIT MODE
  if (isEditing === true) {
    function handleClickAdd(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      
      if (editMode) {
        if (inputValue.trim() !== '') {
          onSubmit(inputValue);
        }
      }
      
      setEditMode(!editMode);
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
  } else {

    //UPDATE LIST MODE
    function handleClickUpdate(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      
      if (updateMode) {
        if (inputValue.trim() !== '') {
          onSubmit(inputValue);
        }
      }
      setUpdateMode(!updateMode);
    }

    return (
      <>
        {updateMode ? (
          <input 
            className={inputClassName}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
}