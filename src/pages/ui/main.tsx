import { Suspense, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantListWidget } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category, Restaurant } from '@entities/restaurant';

import { ErrorBoundary, RestaurantSkeleton } from '@shared/ui';

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

  return (
    <div>
      <AppHeader />

      <main>
        <div className="restaurant-filter-container">
          <CategorySelect setCategory={setCategory} category={category} />
        </div>

        <section>
          <ErrorBoundary
            fallback={({ handleReset }) => (
              <div className="flex h-full w-full items-center justify-center">
                <p>데이터를 불러오는 중 오류가 발생했습니다.</p>

                <button onClick={handleReset} className="button--primary">
                  다시 시도
                </button>
              </div>
            )}
          >
            <Suspense fallback={<RestaurantSkeleton />}>
              <ModalProvider>
                <RestaurantListWidget category={category} />
              </ModalProvider>
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
};
