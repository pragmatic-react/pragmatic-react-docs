import { Suspense, useState } from 'react';

import { AppHeader } from '@widgets/layout';
import { RestaurantDetailDrawer, RestaurantList, RestaurantListWidget } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import {
  Category,
  Restaurant,
  fetchRestaurantData,
  useGetFavoriteRestaurantData,
  useGetRestaurantData,
} from '@entities/restaurant';
import { useGetUserInfo } from '@entities/user';

import { useModalState } from '@shared/hooks';
import { ErrorBoundary, RestaurantSkeleton } from '@shared/ui';

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export const MainPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

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
          {/* TODO: useFetchData에서 발생하는 에러 ErrorBoundary로 처리, fetching 로직 컴포넌트 분리 */}
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
                <RestaurantListWidget category={category} handleCardClick={handleCardClick} />
              </Suspense>
            </ErrorBoundary>

            <RestaurantDetailDrawer selected={selected} />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
};
