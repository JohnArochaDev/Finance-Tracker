/** @jsxImportSource @emotion/react */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChartProvider } from './context/ChartContext';
import styles from './pages/Home/styles.ts';
import GlobalStyles from './styles/globalStyles.ts';
import NavBar from './components/Navbar/index.tsx';
import Home from './pages/Home/index.tsx';
import MyFinances from './pages/MyFinances/index.tsx';
import Settings from './pages/Settings/index.tsx';
import LogOut from './pages/LogOut/index.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChartProvider>
      <div css={GlobalStyles.bg}>
        <div className="main" >
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-finances" element={<MyFinances />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<LogOut />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ChartProvider>
  </StrictMode>,
);