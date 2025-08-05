export interface IList {
  id: number;
  title: string;
  position: number;
  cards: ICard[];
}

export interface ICard {
  id: number;
  content: string;
  position: number;
  color: string;
  tags: ITag[];
}

export interface ITag {
  id: number;
  name: string;
  color: string;
}
