import { useEffect, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantList } from '@widgets/restaurant';

import { ModalProvider, useModal } from '@features/modal';
import { CategorySelect, RestaurantDetailDrawer } from '@features/restaurant';

import { Category, Restaurant } from '@entities/restaurant';

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

  const [selected, setSelected] = useState<Restaurant | null>(null);
  const { isOpen, openModal } = useModal();

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelected(null);
    }
  }, [isOpen]);

  return (
    <div>
      <AppHeader />

      <main>
        <section className="restaurant-filter-container">
          <CategorySelect setCategory={setCategory} category={category} />
        </section>

        <section>
          <ModalProvider>
            <RestaurantList handleCardClick={handleCardClick} category={category} />

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
