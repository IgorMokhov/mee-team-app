import { SubmitHandler, useForm } from 'react-hook-form';
import { Logo } from '../../UI/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../redux/userApi';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setToken } from '../../redux/slices/auth/authSlice';
import { ErrorResponse } from '../../types/error';
import styles from './SignUp.module.scss';

interface SignUpForm {
  email: string;
  termsAccepted: boolean;
}

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignUpForm>();

  const [signup, { isSuccess, data: dataSignup, error: errorSignup }] =
    useSignupMutation();

  const onSubmit: SubmitHandler<SignUpForm> = async ({ email }) => {
    await signup({
      email,
      lang: 'en',
    }).unwrap();
  };

  console.log((errorSignup as ErrorResponse)?.data.message); // we can show this error in the app

  useEffect(() => {
    if (isSuccess && dataSignup) {
      const token = dataSignup.data.token;
      dispatch(setToken(token));
      navigate('/');
    }
  }, [isSuccess, dataSignup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.signup}>
        <Logo size={'medium'} />
        <p className={styles.signup_descr}>
          Merci d'entrer vos informations de connexion
        </p>

        <form className={styles.signup_form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="force@adresseemail.com"
            id="email"
          />

          <label htmlFor="termsAccepted">
            <input
              {...register('termsAccepted', { required: true })}
              type="checkbox"
              id="termsAccepted"
            />
            J'accepte{' '}
            <Link to="#">les termes et les conditions d'utilisation.</Link>
          </label>

          <button className={styles.signup_btn}>S’inscrire</button>
        </form>
        <p className={styles.signup_text}>
          Vous possedez déjà un compte ?
          <Link className={styles.signup_link} to="/signin">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};
