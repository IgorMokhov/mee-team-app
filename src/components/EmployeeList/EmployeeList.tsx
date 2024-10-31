import { PORTAL_ID } from '../../config/constants';
import { useAppSelector } from '../../redux/hooks';
import { useGetAllEmployeesQuery } from '../../redux/userApi';
import { ServerEmployee } from '../../types/employees';
import { ErrorResponse } from '../../types/error';
import { extractLocalEmployee } from '../../utils/extractLocalEmployee';
import { Employee } from '../Employee/Employee';
import styles from './EmployeeList.module.scss';

export const EmployeeList = () => {
  const token = useAppSelector((state) => state.auth.token);

  const {
    data: employees,
    error,
    isLoading,
  } = useGetAllEmployeesQuery(PORTAL_ID, {
    skip: !token,
  });

  const fireEmployee = (id: number) => {};
  const removeEmployee = (id: number) => {};

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error: {(error as ErrorResponse).data.message}</h3>;
  }

  return (
    <ul className={styles.emplist}>
      {employees?.data.map((employee: ServerEmployee) => (
        <Employee
          key={employee.profile.employee_id}
          {...extractLocalEmployee(employee)}
          fireEmployee={fireEmployee}
          removeEmployee={removeEmployee}
        />
      ))}
    </ul>
  );
};
