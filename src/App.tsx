import React from 'react';
import './App.css';

import db from '../db.json';
import RestaurantList from './components/List/RestaurantList';
import { ModalProvider } from './components/Modal/ModalProvider';

function App() {
  const { restaurants } = db;

  return (
    <>
      <div>
        <header className='bg-orange px-4 py-[10px] text-white'>
          <h1>점심 뭐 먹지</h1>
        </header>
        <main>
          <ModalProvider>
            <RestaurantList restaurants={restaurants} />
          </ModalProvider>
        </main>
      </div>
      <div id='modal-root' />
    </>
  );
}

export default App;
