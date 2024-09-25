export type PaginationMeta = {
  total: number;
  from: number;
  to: number;
  count: number;
  per_page: number;
  current: number;
  last_page: number;
};

export type Collection<T = Record<string, any>> = {
  data: T[];
};

export type Pagination<T = Record<string, any>> = {
  data: T[];
  meta: PaginationMeta;
};

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
