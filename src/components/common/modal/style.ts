import { css, keyframes } from '@emotion/react';
import { PlacementType } from '.';

export const modalDefaultStyle = (isOpen: boolean) => {
  return css`
    display: ${isOpen ? 'block' : 'none'};
  `;
};

export const overlayStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(30%); 
  }
  100% {
    transform: translateY(0); 
  }
`;

export const modalContainerStyle = (placement: PlacementType = 'bottom') => css`
  position: fixed;
  width: 100%;
  background: var(--grey-100);
  padding: 32px 16px;

  animation: ${placement === 'center' ? fadeIn : slideUp} 0.7s ease-out;

  ${placement === 'bottom' &&
  css`
    bottom: 0;
    border-radius: 8px 8px 0px 0px;
  `}

  ${placement === 'center' &&
  css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 80vh;

    border-radius: 8px;

    overflow-y: auto; /* 스크롤 가능하도록 추가 */
  `}

  ${placement === 'top' &&
  css`
    top: 0;
    border-radius: 0px 0px 8px 8px;
  `}
`;
