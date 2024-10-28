import { SubmitHandler, useForm } from 'react-hook-form';
import { Logo } from '../../UI/Logo/Logo';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';

interface SignUpForm {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  };

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
          <label htmlFor="phone">Mot de passe</label>
          <input
            {...register('phone', { required: true })}
            type="tel"
            placeholder="(+237) 696 88 77 55"
            id="phone"
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="********************"
            id="password"
          />
          <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
          <input
            {...register('confirmPassword', { required: true })}
            type="confirmPassword"
            placeholder="********************"
            id="confirmPassword"
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
