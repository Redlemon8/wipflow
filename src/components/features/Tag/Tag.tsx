import type { ITag } from "../../../@types";

interface ITagProps {
  tag: ITag;
  onDeleteTag: () => void;
  onAddTagToCard: () => void;
}

export function Tag({ tag, onDeleteTag, onAddTagToCard }: ITagProps) {
  return (
    <div className="tag-container">
      <div className="tag-color" style={{ backgroundColor: tag.color }}></div>
      <div className="tag-name">{tag.name}</div>
      <button className="tag-delete" onClick={onAddTagToCard}>+</button>
      <button className="tag-delete" onClick={onDeleteTag}>X</button>
    </div>
  );
}