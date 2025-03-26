export type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export type Review = {
  id: string;
  rating: number;
  content: string;
  author: string;
  date: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  category: Category;
  isFavorite: boolean;
  reviews: Review[];
};
