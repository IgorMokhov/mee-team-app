import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../UI/Logo/Logo';
import arrowIcon from '../../assets/icons/arrowIcon.svg';
import { useAppDispatch } from '../../redux/hooks';
import { useSigninMutation } from '../../redux/userApi';
import { ErrorResponse } from '../../types/error';
import { useEffect } from 'react';
import { setToken } from '../../redux/slices/auth/authSlice';
import styles from './SignIn.module.scss';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInForm>();

  const [signin, { isSuccess, data: dataSignin, error: errorSignin }] =
    useSigninMutation();

  const onSubmit: SubmitHandler<SignInForm> = async ({ email, password }) => {
    await signin({
      email,
      password,
      lang: 'en',
    }).unwrap();
  };

  console.log((errorSignin as ErrorResponse)?.data.message); // we can show this error in the app

  useEffect(() => {
    if (isSuccess && dataSignin) {
      const token = dataSignin.data.token;
      dispatch(setToken(token));
      navigate('/');
    }
  }, [isSuccess, dataSignin]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.signin}>
        <Logo size="medium" />
        <p className={styles.signin_descr}>
          Merci d'entrer vos informations de connexion
        </p>
        <form className={styles.signin_form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="johndoe@gmail.com"
            id="email"
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="********************"
            id="password"
          />
          <Link className={styles.signin_text} to="/reset-password">
            Mot de passe oublié ?
          </Link>
          <button className={styles.signin_btn}>
            Se connecter
            <img src={arrowIcon} alt="arrow" />
          </button>
        </form>
        <p className={styles.signin_text}>
          Vous n’avez pas de compte ?{' '}
          <Link className={styles.signin_link} to="/signup">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};
