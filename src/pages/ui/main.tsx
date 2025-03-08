import { useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantList } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category, Restaurant, fetchRestaurantData } from '@entities/restaurant';

import { useFetchData, useModalState } from '@shared/hooks';

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

  const { data, isPending, refetch } = useFetchData({
    fetchKey: ['restaurant-list', category],
    fetchFunction: async () => {
      const params = category ? { category } : undefined;
      const data = await fetchRestaurantData(params);
      return data;
    },
  });
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const { openModal } = useModalState();

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  return (
    <div>
      <AppHeader />

      <main>
        <section className="restaurant-filter-container">
          <CategorySelect setCategory={setCategory} category={category} />
        </section>

        <section>
          <ModalProvider>
            <RestaurantList data={data ?? []} isPending={isPending} handleCardClick={handleCardClick} />

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
