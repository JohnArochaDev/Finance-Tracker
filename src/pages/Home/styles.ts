import { css } from '@emotion/react';

const styles = {
  container: css`
    height: 100%;
    flex-direction: column;
  `,
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
  `,
  barChartContainer: css`
    width: 55vw;
    height: auto;
  `,
};

export default styles;
