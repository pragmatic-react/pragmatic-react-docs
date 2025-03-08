import { MouseEventHandler } from 'react';

import { Category } from '@entities/restaurant';

import { Select, SelectOption } from '@shared/ui';

const CATEGORIES: SelectOption<Category | '전체'>[] = [
  { label: '전체', value: '전체' },
  { label: '한식', value: '한식' },
  { label: '중식', value: '중식' },
  { label: '일식', value: '일식' },
  { label: '양식', value: '양식' },
  { label: '아시안', value: '아시안' },
  { label: '기타', value: '기타' },
];

type Props = {
  category: Category | null;
  setCategory: (category: Category | null) => void;
};

export const CategorySelect = ({ category, setCategory }: Props) => {
  const handleClick: MouseEventHandler<HTMLSelectElement> = (e) => {
    const value = e.currentTarget.value;

    if (value === '전체') {
      setCategory(null);
      return;
    }

    setCategory(value as Category);
  };

  return (
    <Select
      id="category-filter"
      className="restaurant-filter"
      value={category ?? '전체'}
      aria-label="음식점 카테고리 필터"
      options={CATEGORIES}
      onClick={handleClick}
    />
  );
};
