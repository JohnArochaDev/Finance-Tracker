/** @jsxImportSource @emotion/react */
import styles from './styles.ts';
import NavBar from '../Navbar/index.tsx';
import PieChartComponent from '../Charts/PiChart/index.tsx';
import BarChart from '../Charts/BarChart/index.tsx'

function App() {
  return (
    <>
      <NavBar />
      <div css={styles.appContainer}>
        <div css={styles.pieChartContainer}>
          <PieChartComponent />
        </div>
      </div>
      <div css={styles.appContainer}>
        <div css={styles.barChartContainer}>
          <BarChart />
        </div>
      </div>
    </>
  );
}

export default App;