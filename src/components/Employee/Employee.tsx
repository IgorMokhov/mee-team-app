import { LocalEmployee } from '../../types/employees';
import styles from './Employee.module.scss';

interface EmployeeProps extends LocalEmployee {
  fireEmployee: (id: number) => void;
  removeEmployee: (id: number) => void;
  openModal: () => void;
  setSelectedEmployee: (employee: LocalEmployee) => void;
}

export const Employee = ({
  employeeId,
  firstName,
  lastName,
  email,
  phone,
  statusDismiss,
  setSelectedEmployee,
  openModal,
  fireEmployee,
  removeEmployee,
}: EmployeeProps) => {
  const onClickEmployee = () => {
    openModal();
    setSelectedEmployee({
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      statusDismiss,
    });
  };

  return (
    <li className={styles.employee} onClick={onClickEmployee}>
      <span>{firstName ?? 'Empty'}</span>
      <span>{lastName ?? 'Empty'}</span>
      <span>{email ?? 'Empty'}</span>
      <span>{phone ?? 'Empty'}</span>
      <span
        className={
          statusDismiss ? styles.employee_active : styles.employee_dismiss
        }
      >
        {statusDismiss ? 'Validé' : 'Inactif'}
      </span>
      <span>
        <button
          className={styles.employee_firebtn}
          onClick={() => fireEmployee(employeeId)}
        >
          Suspendre
        </button>
        <button
          className={styles.employee_rmbtn}
          onClick={() => removeEmployee(employeeId)}
        >
          Supprimer
        </button>
      </span>
    </li>
  );
};
