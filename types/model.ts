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
  id?: number | string;
  title: string;
  subtitle?: string;
  image?: string;
  type: string;
  url: string;
  index?: number;
};

export type PlayList = {
  title: string;
  subtitle?: string;
  server_url: string;
  order: number;
  type: string;
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

export type LectureItems = {
  id: number;
  name: string;
  url: string;
  image: string;
};

export type LectureWithItems = Lecture & {
  items: LectureItems[];
};

export type Reciter = {
  id: number;
  name: string;
  riwayats?: Riwayat[];
};

export type Riwayat = {
  id: number;
  name_ar: string;
  surah_total: string;
  surah_list: Record<string, string>;
  server_url: string;
};

export type HisnmuslimItem = {
  ID: number;
  TITLE: string;
  AUDIO_URL: string;
  TEXT: string;
};

export type HisnmuslimContentItem = {
  ID: number;
  ARABIC_TEXT: string;
  LANGUAGE_ARABIC_TRANSLATED_TEXT: string;
  TRANSLATED_TEXT: string;
  REPEAT: number;
  AUDIO: string;
};

export type Mosque = {
  name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
};
