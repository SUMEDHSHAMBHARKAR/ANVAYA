import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { Overview } from './pages/Overview';
import { Infrastructure } from './pages/Infrastructure';
import { Flood } from './pages/Flood';
import { Decision } from './pages/Decision';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="flood" element={<Flood />} />
          <Route path="decision" element={<Decision />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
