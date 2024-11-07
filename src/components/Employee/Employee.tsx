import { PORTAL_ID } from '../../config/constants';
import { useChangeEmployeeStatusMutation } from '../../redux/userApi';
import { LocalEmployee } from '../../types/employees';
import { ErrorResponse } from '../../types/error';
import styles from './Employee.module.scss';

interface EmployeeProps extends LocalEmployee {
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
}: EmployeeProps) => {
  const [changeEmployeeStatus, { error }] = useChangeEmployeeStatusMutation();

  const selectEmployeeHandler = () => {
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

  const updateStatusHandler = async () => {
    await changeEmployeeStatus({
      portal_id: PORTAL_ID,
      employee_id: employeeId,
      dismiss: !statusDismiss,
    });
  };

  console.log((error as ErrorResponse)?.data.message); // we can show this error in the app

  return (
    <li className={styles.employee}>
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
          className={styles.employee_statusBtn}
          onClick={updateStatusHandler}
        >
          {statusDismiss ? 'Suspendre' : 'Inviter'}
        </button>
        <button
          className={styles.employee_editBtn}
          onClick={selectEmployeeHandler}
        >
          Modifier
        </button>
      </span>
    </li>
  );
};
