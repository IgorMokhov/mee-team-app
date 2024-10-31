import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { EmployeesResponse } from '../types/employees';

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
      query: (portal_id) => ({
        url: `/administration/portal/${portal_id}/employees`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGetAllEmployeesQuery } =
  userApi;
