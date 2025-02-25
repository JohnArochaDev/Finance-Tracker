import { css } from '@emotion/react';

const styles = {
  container: css`
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  `,
  appContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    scroll-snap-align: start;
  `,
  pieChartContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 60%;
  `,
  barChartContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 60%;
  `,
};

export default styles;