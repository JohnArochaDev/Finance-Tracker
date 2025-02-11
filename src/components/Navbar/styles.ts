import { css } from '@emotion/react';

const styles = {
  navStyle: css`
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 1000; /* Ensure it is above other content */
  `,
};

export default styles;