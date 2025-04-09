import { css } from '@emotion/react';

export const itemStyle = css`
  display: flex;
  align-items: flex-start;

  padding: 16px 8px;

  border-bottom: 1px solid #e9eaed;
`;

export const infoWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const infoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

export const infoTextStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
`;

export const nameStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin: 0;
`;

export const distanceStyle = css`
  color: var(--primary-color);
`;

export const descriptionStyle = css`
  display: -webkit-box;

  padding-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const categoryStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: var(--lighten-color);
`;

export const categoryIconStyle = css`
  width: 36px;
  height: 36px;
`;
