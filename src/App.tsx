import React from 'react';
import './App.css';

import db from '../db.json';
import RestaurantList from './components/List/RestaurantList';
import { ModalProvider } from './components/Modal/ModalProvider';
import Header from './components/Header/Header';
function App() {
  const { restaurants } = db;

  return (
    <>
      <ModalProvider>
        <div>
          <Header />
          <main>
            <RestaurantList restaurants={restaurants} />
          </main>
        </div>
      </ModalProvider>
      <div id='modal-root' />
    </>
  );
}

export default App;
