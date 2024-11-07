import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import {
  EmployeeEditRequest,
  EmployeeAddRequest,
  EmployeesResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  EmployeeUpdateStatus,
} from '../types/employees';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Employees'], 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.mee.team',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (signupData) => ({
        url: '/registration/email',
        method: 'POST',
        body: signupData,
      }),
    }),
    signin: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginData) => ({
        url: '/token',
        method: 'POST',
        body: loginData,
      }),
    }),
    getAllEmployees: builder.query<EmployeesResponse, number>({
      query: (portalId) => ({
        url: `/administration/portal/${portalId}/employees`,
      }),
      providesTags: ['Employees'],
    }),
    editEmployee: builder.mutation<EmployeesResponse, EmployeeEditRequest>({
      query: ({ id, body }) => ({
        url: `/administration/portal/${body.portal_id}/employees/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Employees'],
    }),
    addEmployee: builder.mutation<EmployeesResponse, EmployeeAddRequest>({
      query: (employeeData) => ({
        url: `/administration/portal/${employeeData.portal_id}/employees/invite`,
        method: 'POST',
        body: employeeData,
      }),
      invalidatesTags: ['Employees'],
    }),
    changeEmployeeStatus: builder.mutation<void, EmployeeUpdateStatus>({
      query: (updatedData) => ({
        url: `administration/portal/${updatedData.portal_id}/employees/status/${updatedData.employee_id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetAllEmployeesQuery,
  useEditEmployeeMutation,
  useAddEmployeeMutation,
  useChangeEmployeeStatusMutation,
} = userApi;
