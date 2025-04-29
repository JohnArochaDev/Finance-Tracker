/** @jsxImportSource @emotion/react */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChartProvider } from './context/ChartContext';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import NavBar from './components/Navbar/index.tsx';
import Home from './pages/Home/index.tsx';
import MyFinances from './pages/MyFinances/index.tsx';
import Settings from './pages/Settings/index.tsx';
import LogOut from './pages/Auth/logOut.tsx.tsx';
import LogIn from './pages/Auth/logIn.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
    const { loggedIn } = useAuth();

    return (
        <div className="main">
            <Router>
                <NavBar />
                <Routes>
                    {loggedIn ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/my-finances" element={<MyFinances />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/logout" element={<LogOut />} />
                        </>
                    ) : (
                        <Route path="*" element={<LogIn />} />
                    )}
                </Routes>
            </Router>
        </div>
    );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChartProvider>
        <Global styles={globalStyles} />
        <AppContent />
      </ChartProvider>
    </AuthProvider>
  </StrictMode>,
);
