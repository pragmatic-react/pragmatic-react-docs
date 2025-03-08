import { RESTAURANT_CATEGORY } from '@/consts';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  margin-top: 24px;
`;

const filterStyle = css`
  height: 44px;
  min-width: 125px;

  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;

  font-size: 16px;

  padding: 8px;
`;

export function RestaurantFilterSection() {
  const CATEGORIES = Object.keys(RESTAURANT_CATEGORY);
  const CATEGORY_FILTER = ['전체', ...CATEGORIES];
 
  // TODO: CategoryFilter 라는 컴포넌트로 분리
  return (
    <section css={containerStyle}>
      <select
        name="category"
        id="category-filter"
        css={filterStyle}
        aria-label="음식점 카테고리 필터"
      >
        {CATEGORY_FILTER.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <select name="sort" id="sort-filter" css={filterStyle} aria-label="정렬">
        <option value="이름순">이름순</option>
        <option value="거리순">거리순</option>
      </select>
    </section>
  );
}
