import React from 'react';

import { Select, SelectOption } from '@shared/ui';

const CATEGORIES: SelectOption[] = [
  { label: '전체', value: '전체' },
  { label: '한식', value: '한식' },
  { label: '중식', value: '중식' },
  { label: '일식', value: '일식' },
  { label: '양식', value: '양식' },
  { label: '아시안', value: '아시안' },
  { label: '기타', value: '기타' },
];

export const CategorySelect = () => {
  return (
    <Select id="category-filter" className="restaurant-filter" aria-label="음식점 카테고리 필터" options={CATEGORIES} />
  );
};
