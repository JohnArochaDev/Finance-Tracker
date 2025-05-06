/** @jsxImportSource @emotion/react */
import styles from "./styles.ts";
import NavBar from "../../components/Navbar/index.tsx";
import PieChartComponent from "../../components/Charts/PiChart/index.tsx";
import BarChart from "../../components/Charts/BarChart/index.tsx";
import RadarChart from "../../components/Charts/RadarChart/index.tsx";

function Home() {
  // add a useEffect that grabs the data and populates the charts here
  // maybe add loaders for if thecharts dont have data just yet
  
  return (
    <>
      <NavBar />
      <div css={styles.container}>
        <div css={styles.appContainer}>
          <div css={styles.pieChartContainer}>
            <p css={styles.pLeft}>
              "Understanding your monthly expenses is the first step towards
              better financial management. Keep track of where your money goes
              to make informed decisions and achieve your financial goals."
            </p>
            <PieChartComponent />
          </div>
        </div>
        <div css={styles.appContainer}>
          <div css={styles.barChartContainer}>
            <RadarChart />
            <p css={styles.pRight}>
              <span style={{ fontWeight: "bold" }}>
                "Studies show that keeping your discretionary spending under 30%
                of your income can significantly boost your savings over time."
              </span>{" "}
              -Your friendly neighborhood developer
            </p>
          </div>
        </div>
        <div css={styles.appContainer}>
          <div css={styles.barChartContainer}>
            <p css={styles.pBottom}>Days until debt free:</p>
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
