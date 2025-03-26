import { Header, RestaurantFilterSection } from './components';
import { RestaurantList } from './components';
import { GlobalStyle } from './global-style';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <RestaurantFilterSection />
        <RestaurantList />
      </main>
    </>
  );
}

export default App;
