import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { DinoDetail } from './pages/DinoDetail';
import { Explore } from './pages/Explore';
import { Identify } from './pages/Identify';

// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="identify" element={<Identify />} />
          <Route path="dino/:id" element={<DinoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
