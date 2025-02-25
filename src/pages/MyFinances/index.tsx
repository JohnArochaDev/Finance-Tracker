/** @jsxImportSource @emotion/react */

import PieChartForm from '../../components/Forms/FinanceForm/index.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './styles.ts'

function MyFinances() {
  return (
    <div css={styles.appContainer}>
      <h1 css={styles.heading}>My Finances</h1>
      <PieChartForm />
    </div>
  );
}

export default MyFinances;
