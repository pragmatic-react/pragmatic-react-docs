import { css } from '@emotion/react';

export const defaultStyle = css`
  width: 100%;
  height: 44px;

  margin-right: 16px;

  border: none;
  border-radius: 8px;

  font-weight: 600;
  font: var(--text-body);

  cursor: pointer;

  :last-child {
    margin-right: 0;
  }
`;

export const primaryStyle = css`
  background: var(--primary-color);

  color: var(--grey-100);
`;

export const secondaryStyle = css`
  border: 1px solid var(--grey-300);
  background: transparent;

  color: var(--grey-300);
`;
