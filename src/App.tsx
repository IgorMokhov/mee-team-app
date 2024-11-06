import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { MainLayout } from './layouts/MainLayout';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setToken } from './redux/slices/auth/authSlice';
import { NewEmployeePage } from './pages/NewEmployeePage';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(setToken(token));
  }, []);

  return (
    <>
      <Routes>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="add-new-employee" element={<NewEmployeePage />} />
        </Route>
      </Routes>
    </>
  );
};
