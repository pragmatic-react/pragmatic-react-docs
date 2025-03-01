import { AppHeader } from '@widgets/layout';
import { RestaurantList } from '@widgets/restaurant';

import { ModalProvider } from '@features/modal';
import { CategorySelect } from '@features/restaurant';

import './App.css';

function App() {
  return (
    <div>
      <AppHeader />

      <main>
        <section className="restaurant-filter-container">
          <CategorySelect />
        </section>

        <section>
          <ModalProvider>
            <RestaurantList />
          </ModalProvider>
        </section>
      </main>
    </div>
  );
}

export default App;
