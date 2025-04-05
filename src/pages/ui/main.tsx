import { Suspense, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantListWidget } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category } from '@entities/restaurant';

import { GlobalErrorBoundary, LoadingState, RestaurantSkeleton } from '@shared/ui';

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <AppHeader />

      <main>
        <div className="restaurant-filter-container">
          <CategorySelect setCategory={setCategory} category={category} />
        </div>

        <section>
          <GlobalErrorBoundary>
            <LoadingState isLoading={isLoading} fallback={<RestaurantSkeleton />} aria-label="레스토랑 목록 로딩 중">
              <Suspense fallback={<RestaurantSkeleton />}>
                <ModalProvider>
                  <RestaurantListWidget category={category} />
                </ModalProvider>
              </Suspense>
            </LoadingState>
          </GlobalErrorBoundary>
        </section>
      </main>
    </div>
  );
};
