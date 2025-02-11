/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './pages/Home/styles.ts';
import NavBar from './components/Navbar/index.tsx';
import PieChartComponent from './components/Charts/PiChart/index.tsx';
import BarChart from './components/Charts/BarChart/index.tsx';
import Home from './pages/Home/index.tsx';
import MyFinances from './pages/MyFinances/index.tsx';
import Settings from './pages/Settings/index.tsx';
import LogOut from './pages/LogOut/index.tsx';

function App() {
  return (
    <Router>
      <NavBar />
      <div css={styles.appContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-finances" element={<MyFinances />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/pie-chart" element={<PieChartComponent />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;