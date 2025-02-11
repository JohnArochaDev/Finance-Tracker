/** @jsxImportSource @emotion/react */
import styles from './styles.ts';
import NavBar from '../Navbar/index.tsx';
import PieChartComponent from '../Charts/PiChart/index.tsx';

function App() {
  return (
    <>
      <NavBar />
      <div css={styles.appContainer}>
        <div css={styles.chartContainer}>
          <PieChartComponent />
        </div>
      </div>
    </>
  );
}

export default App;