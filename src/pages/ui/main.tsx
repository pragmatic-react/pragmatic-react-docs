import { Suspense, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantListWidget } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import { Category, Restaurant } from '@entities/restaurant';

import { ErrorBoundary, RestaurantSkeleton } from '@shared/ui';

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

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
                <RestaurantListWidget category={category} setSelected={setSelected} />
              </Suspense>
            </ErrorBoundary>

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
