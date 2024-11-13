import { Provider } from 'react-redux';

import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PhotoDetail from './pages/DetailsPage/DetailsPage';

function App() {
  return (
    <>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>

    </Provider>
    </>
  );
}

export default App;
