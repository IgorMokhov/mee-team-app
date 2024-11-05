import { useState } from 'react';
import { PORTAL_ID } from '../../config/constants';
import { useAppSelector } from '../../redux/hooks';
import {
  useEditEmployeeMutation,
  useGetAllEmployeesQuery,
} from '../../redux/userApi';
import { LocalEmployee, ServerEmployee } from '../../types/employees';
import { ErrorResponse } from '../../types/error';
import { extractLocalEmployee } from '../../utils/extractLocalEmployee';
import { Employee } from '../Employee/Employee';
import { Modal } from '../../UI/Modal/Modal';
import styles from './EmployeeList.module.scss';

export const EmployeeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<null | LocalEmployee>(null);

  const [editEmployee, { data: dataEdit, error: errorEdit }] =
    useEditEmployeeMutation();

  console.log('data:', dataEdit);
  console.log('error:', errorEdit);

  const token = useAppSelector((state) => state.auth.token);

  const {
    data: employees,
    error: errorEmployees,
    isLoading: isLoadingEmployees,
    refetch,
  } = useGetAllEmployeesQuery(PORTAL_ID, {
    skip: !token,
  });

  const fireEmployee = (id: number) => {};
  const removeEmployee = (id: number) => {};

  if (isLoadingEmployees) {
    return <h3>Loading...</h3>;
  }
  if (errorEmployees) {
    return <h3>Error: {(errorEmployees as ErrorResponse).data.message}</h3>;
  }

  return (
    <>
      <ul className={styles.emplist}>
        {Array.isArray(employees?.data) &&
          employees?.data.map((employee: ServerEmployee) => (
            <Employee
              key={employee.profile.employee_id}
              {...extractLocalEmployee(employee)}
              fireEmployee={fireEmployee}
              removeEmployee={removeEmployee}
              openModal={() => setIsModalOpen(true)}
              setSelectedEmployee={setSelectedEmployee}
            />
          ))}
      </ul>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          selectedEmployee={selectedEmployee!}
          editEmployee={editEmployee}
          refetchEmployees={refetch}
        />
      )}
    </>
  );
};
