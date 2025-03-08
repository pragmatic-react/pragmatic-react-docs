import { Category } from '../model';

export const CATEGORY_IMAGES: Record<Category, string> = {
  한식: '/assets/category-korean.png',
  중식: '/assets/category-chinese.png',
  일식: '/assets/category-japanese.png',
  양식: '/assets/category-western.png',
  아시안: '/assets/category-asian.png',
  기타: '/assets/category-etc.png',
};

export const CATEGORY_OPTIONS = [
  { label: '카테고리 선택', value: undefined },
  { label: '한식', value: '한식' },
  { label: '중식', value: '중식' },
  { label: '일식', value: '일식' },
  { label: '양식', value: '양식' },
  { label: '아시안', value: '아시안' },
  { label: '기타', value: '기타' },
];
