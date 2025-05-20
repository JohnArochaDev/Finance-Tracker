/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import Axios from "axios";

import { useAuth } from "../../context/AuthContext.tsx";
import { useChartContext } from "../../context/ChartContext.tsx";
import { ChartData } from "../../context/ChartContext.tsx";
import styles from "./styles.ts";
import NavBar from "../../components/Navbar/index.tsx";
import PieChartComponent from "../../components/Charts/PiChart/index.tsx";
import BarChart from "../../components/Charts/BarChart/index.tsx";
import RadarChart from "../../components/Charts/RadarChart/index.tsx";

function Home() {
  const { JWT, userId } = useAuth();
  const { setPieData, setRadarData, setBarData, setFinances } = useChartContext();

  // add a useEffect that grabs the data and populates the charts here
  // maybe add loaders for if thecharts dont have data just yet

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/finance/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    })
      .then(function (response) {
        console.log("finances", response);
        // add logic to see if a user owns finances.ChartData if not, render a component to make one
        if (response.status === 200) {

          const data = response.data
          console.log('DATATATATA', data)

          setFinances({
            totalIncome: data.totalIncome,
            totalExpenses: data.totalExpenses,
            deficit: data.deficit,
            remaining: data.remaining,
            totalSavings: data.totalSavings,
            totalDebt: data.totalDebt,
          })

          data.charts.forEach((chart: ChartData) => {
            // fix the any
            if (chart.type === "PIE_DATA") {
              setPieData({
                labels: chart.labels,
                datasets: chart.datasets,
              });
            } else if (chart.type === "RADAR_DATA") {
              setRadarData({
                labels: chart.labels,
                datasets: chart.datasets,
              });
            } else if (chart.type === "BAR_DATA") {
              setBarData({
                labels: chart.labels,
                datasets: chart.datasets,
              });
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
