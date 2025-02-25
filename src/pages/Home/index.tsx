/** @jsxImportSource @emotion/react */
import styles from './styles.ts';
import NavBar from '../../components/Navbar/index.tsx';
import PieChartComponent from '../../components/Charts/PiChart/index.tsx';
import BarChart from '../../components/Charts/BarChart/index.tsx'
import RadarChart from '../../components/Charts/RadarChart/index.tsx';

function Home() {
  return (
    <>
      <NavBar />
      <div css={styles.container}>
        <div css={styles.appContainer}>
          <div css={styles.pieChartContainer}>
            <PieChartComponent />
          </div>
        </div>
        <div css={styles.appContainer}>
          <div css={styles.barChartContainer}>
            <RadarChart />
          </div>
        </div>
        <div css={styles.appContainer}>
          <div css={styles.barChartContainer}>
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;