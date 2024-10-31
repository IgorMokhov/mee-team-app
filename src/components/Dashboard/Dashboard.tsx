import { EmployeeList } from '../EmployeeList/EmployeeList';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboard_title}>Configuration</h2>
      <button className={styles.dashboard_add_emp}>
        Ajouter un utilisateur
      </button>

      <EmployeeList />
    </div>
  );
};
