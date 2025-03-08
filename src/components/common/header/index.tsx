import { AddRestaurantModal } from '@/components/restaurant/modal';
import { useBooleanState } from '@/hooks';
import { css } from '@emotion/react';

const defaultStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 64px;
  padding: 0 16px;

  position: sticky;
  top: 0;

  background-color: var(--primary-color);
`;

const titleStyle = css`
  font: var(--text-title);
  color: var(--grey-100);
`;

const buttonStyle = css`
  height: 40px;

  border: none;
  border-radius: 8px;
  background: transparent;

  font-size: 24px;
  cursor: pointer;

  img {
    display: block;
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

export function Header() {
  const [isOpen, toggleIsOpen] = useBooleanState();

  return (
    <>
      <header css={defaultStyle}>
        <h1 css={titleStyle}>점심 뭐 먹지</h1>
        <button onClick={toggleIsOpen} css={buttonStyle} type="button" aria-label="음식점 추가">
          <img src="/assets/add-button.png" alt="음식점 추가" />
        </button>
      </header>
      <AddRestaurantModal isOpen={isOpen} onClose={toggleIsOpen} />
    </>
  );
}
