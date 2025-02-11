import { css } from '@emotion/react';

const styles = {
  appContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `,
  pieChartContainer: css`
    width: 35vw;
    height: 35vw;
    outline: 1px solid black;
  `,
  barChartContainer: css`
    width: 55vw;
    height: auto;
    outline: 1px solid black;
  `,
};

export default styles;