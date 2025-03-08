import { Suspense, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantList } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category, Restaurant } from '@entities/restaurant';

import { RestaurantSkeleton } from '@shared/ui';

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
            <Suspense fallback={<RestaurantSkeleton />}>
              <RestaurantList setSelected={setSelected} category={category} />
            </Suspense>

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
