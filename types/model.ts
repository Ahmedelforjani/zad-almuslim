export type Category = {
  id: number;
  name: string;
};

export type Track = {
  id: number;
  name: string;
  image: string;
  type: string;
  url: string;
};

export type Broadcast = {
  id: number;
  name: string;
  image: string;
  url: string;
  categories: Category[];
};

export type Lecture = {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: Category[];
};
