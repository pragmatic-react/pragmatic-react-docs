import { useEffect, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantList } from '@widgets/restaurant';

import { ModalProvider, useModal } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category, Restaurant } from '@entities/restaurant';

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

  const [selected, setSelected] = useState<Restaurant | null>(null);

  return (
    <div>
      <AppHeader />

      <main>
        <section className="restaurant-filter-container">
          <CategorySelect setCategory={setCategory} category={category} />
        </section>

        <section>
          <ModalProvider>
            <RestaurantList setSelected={setSelected} category={category} />

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
