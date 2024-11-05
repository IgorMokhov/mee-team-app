import { LocalEmployee, ServerEmployee } from '../types/employees';

export const extractLocalEmployee = (
  employee: ServerEmployee
): LocalEmployee => ({
  employeeId: employee.profile.employee_id,
  firstName: employee.profile.first_name,
  lastName: employee.profile.last_name,
  email: employee.profile.personal_email,
  phone: employee.profile.work_phone,
  statusDismiss: employee.status.dismiss,
});
