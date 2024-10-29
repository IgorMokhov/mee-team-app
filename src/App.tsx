import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};
