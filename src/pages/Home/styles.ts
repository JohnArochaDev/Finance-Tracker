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
  pLeft: css`
    color:white;
    font-size: 1.5em;
    padding-right: 5em;
    margin-left: -5em;
    padding-bottom: 5em;
  `,
  pRight: css`
    color:white;
    font-size: 1.5em;
    padding-left: 5em;
    margin-right: -5em;
    padding-bottom: 5em;
  `,
  pBottom: css`
    color:white;
    white-space: nowrap;
    width: 20%;
    font-size: 1.5em;
    padding: -10px;
    margin-right: 5em;
    padding-bottom: 5em;
  `,
};

export default styles;
