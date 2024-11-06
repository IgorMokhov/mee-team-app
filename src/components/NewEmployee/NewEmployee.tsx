import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './NewEmployee.module.scss';

type Role = 'administrator' | 'integrator' | 'employee';

interface NewEmployeeForm {
  firstName: string;
  lastName: string;
  type: Role;
  email: string;
}

export const NewEmployee = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<NewEmployeeForm>();

  const onSubmit: SubmitHandler<NewEmployeeForm> = async (data) => {
    console.log(data);
  };

  return (
    <div className={styles.employee}>
      <h4 className={styles.employee_title}>Ajouter un nouvel employé</h4>
      <form className={styles.employee_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.employee_formGroup}>
          <label htmlFor="firstName">Nom</label>
          <input
            {...register('firstName', { required: true })}
            type="text"
            id="firstName"
            placeholder="Alexander"
          />
        </div>
        <div className={styles.employee_formGroup}>
          <label htmlFor="lastName">Prénom</label>
          <input
            {...register('lastName', { required: true })}
            type="text"
            id="lastName"
            placeholder="Foley"
          />
        </div>
        <div className={styles.employee_formGroup}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            {...register('email', { required: true })}
            type="email"
            id="email"
            placeholder="alexander.foley@mail.com"
          />
        </div>
        <div className={styles.employee_formGroup}>
          <label htmlFor="type">Rôle</label>
          <select
            {...register('type', { required: true })}
            defaultValue={''}
            id="type"
          >
            <option value="employee">Employee</option>
            <option value="integrator">Integrator</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        <div className={styles.employee_actions}>
          <button className={styles.employee_submit} type="submit">
            Ajouter
          </button>
          <button
            className={styles.employee_back}
            onClick={() => navigate('/')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};
