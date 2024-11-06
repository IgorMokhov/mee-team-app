import { useNavigate } from 'react-router-dom';
import { EmployeeList } from '../EmployeeList/EmployeeList';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboard_title}>Configuration</h2>
      <button
        className={styles.dashboard_add_emp}
        onClick={() => navigate('add-new-employee')}
      >
        Ajouter un utilisateur
      </button>

      <EmployeeList />
    </div>
  );
};
