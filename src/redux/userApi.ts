import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { EditRequest, EmployeesResponse } from '../types/employees';

export const userApi = createApi({
  reducerPath: 'userApi',
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
    signup: builder.mutation({
      query: (signupData) => ({
        url: '/registration/email',
        method: 'POST',
        body: signupData,
      }),
    }),
    signin: builder.mutation({
      query: (loginData) => ({
        url: '/token',
        method: 'POST',
        body: loginData,
      }),
    }),
    getAllEmployees: builder.query<EmployeesResponse, number>({
      query: (portalId) => ({
        url: `/administration/portal/${portalId}/employees`,
        method: 'GET',
      }),
    }),
    editEmployee: builder.mutation<EmployeesResponse, EditRequest>({
      query: ({ id, body }) => ({
        url: `/administration/portal/${body.portal_id}/employees/${id}`,
        method: 'PATCH',
        body: body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetAllEmployeesQuery,
  useEditEmployeeMutation,
} = userApi;
