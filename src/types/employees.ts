export interface ServerEmployee {
  status: {
    dismiss: boolean;
  };
  profile: {
    employee_id: number;
    first_name: string | null;
    last_name: string | null;
    personal_email: string | null;
    mobile_phone: string | null;
  };
}

export interface LocalEmployee {
  employeeId: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  statusDismiss: boolean;
}

export interface EmployeesResponse {
  data: ServerEmployee[];
  message: string;
  success: boolean;
}
