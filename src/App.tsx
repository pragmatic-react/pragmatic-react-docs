import React, { useEffect } from 'react';
import './App.css';

import RestaurantList from './components/List/RestaurantList';
import Header from './components/Header/Header';
import { useRestaurants } from './hooks/useRestaurants';

function App() {
  const { restaurants, isLoading, error, fetchRestaurants, addRestaurant } = useRestaurants();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <>
      <div>
        <Header onAddRestaurant={addRestaurant} />
        <main>
          {isLoading ? (
            <div className='flex min-h-[200px] items-center justify-center'>
              <p className='text-gray-600'>로딩 중...</p>
            </div>
          ) : error ? (
            <p className='p-4 text-red-500'>{error.message}</p>
          ) : (
            <RestaurantList restaurants={restaurants} />
          )}
        </main>
      </div>
      <div id='modal-root' />
    </>
  );
}

export default App;
