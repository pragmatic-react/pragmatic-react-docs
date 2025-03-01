export type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  category: Category;
};
