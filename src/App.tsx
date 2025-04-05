import React, { useEffect } from 'react';
import './App.css';

import RestaurantList from './components/List/RestaurantList';
import Header from './components/Header/Header';
import { useRestaurants } from './hooks/useRestaurants';

function App() {
  const {
    restaurants,
    isFetching,
    isAdding,
    fetchingError,
    addingError,
    fetchRestaurants,
    addRestaurantAction,
  } = useRestaurants();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <>
      <div>
        <Header onAddRestaurant={addRestaurantAction} isFetching={isAdding} />
        <main>
          {fetchingError ? (
            <p className='p-4 text-red-500'>{fetchingError.message}</p>
          ) : (
            <>
              {isFetching ? (
                <div className='flex min-h-[200px] items-center justify-center'>
                  <p className='text-gray-600'>로딩 중...</p>
                </div>
              ) : (
                <RestaurantList restaurants={restaurants} />
              )}
            </>
          )}
        </main>
      </div>
      <div id='modal-root' />
    </>
  );
}

export default App;
