import { AppHeader } from '@widgets/layout';
import { RestaurantList } from '@widgets/restaurant';

import { CategorySelect } from '@features/listings';

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
          <RestaurantList />
        </section>
      </main>
    </div>
  );
}

export default App;
