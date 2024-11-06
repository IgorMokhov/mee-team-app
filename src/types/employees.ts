export type Lang = 'en' | 'ru';

export interface ServerEmployee {
  status: {
    dismiss: boolean;
  };
  profile: {
    employee_id: number;
    first_name: string | null;
    last_name: string | null;
    personal_email: string | null;
    work_phone: string | null;
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
  data: ServerEmployee | ServerEmployee[];
  message: string;
  success: boolean;
}

export interface EditRequest {
  id: number;
  body: {
    portal_id: number;
    name_first: string;
    name_last: string;
    phone_work: string;
    email_work: string;
    local: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  lang: Lang;
}

export interface LoginResponse {
  data: {
    token: string;
  };
  message: string;
  success: boolean;
}

export type SignupRequest = Omit<LoginRequest, 'password'>;