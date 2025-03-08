import { AddRestaurantModal } from '@widgets/restaurant';

import { useModalState } from '@shared/hooks';

export const AppHeader = () => {
  const { isOpen, openModal, closeModal } = useModalState();

  return (
    <header className="gnb">
      <h1 className="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" className="gnb__button" aria-label="음식점 추가" onClick={openModal}>
        <img src="/assets/add-button.png" alt="음식점 추가" />
      </button>

      <AddRestaurantModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
