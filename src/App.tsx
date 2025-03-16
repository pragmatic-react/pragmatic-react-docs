import { FetchProvider } from '@shared/providers';

import './App.css';
import { MainPage } from './pages';

function App() {
  return (
    <FetchProvider>
      <MainPage />
    </FetchProvider>
  );
}

export default App;
