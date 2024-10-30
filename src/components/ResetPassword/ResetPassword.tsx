import { Link } from 'react-router-dom';
import { Logo } from '../../UI/Logo/Logo';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './ResetPassword.module.scss';

interface ResetPasswordProps {
  email: string;
  password: string;
}

export const ResetPassword = () => {
  const { register, handleSubmit } = useForm<ResetPasswordProps>();

  const onSubmit: SubmitHandler<ResetPasswordProps> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.reset}>
        <Logo size={'medium'} />
        <form className={styles.reset_form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="force@adresseemail.com"
            id="email"
          />
          <button className={styles.reset_btn}>Se connecter</button>
        </form>
        <Link className={styles.reset_link} to="/signin">
          Retour à la page connexion
        </Link>
      </div>
    </div>
  );
};
