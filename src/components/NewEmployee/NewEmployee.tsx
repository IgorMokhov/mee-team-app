import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types/employees';
import { useAddEmployeeMutation } from '../../redux/userApi';
import { PORTAL_ID } from '../../config/constants';
import { ErrorResponse } from '../../types/error';
import styles from './NewEmployee.module.scss';

interface NewEmployeeForm {
  firstName: string;
  lastName: string;
  type: Role;
  email: string;
}

export const NewEmployee = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<NewEmployeeForm>();

  const [addEmployee, { error }] = useAddEmployeeMutation();

  const onSubmit: SubmitHandler<NewEmployeeForm> = async ({
    email,
    firstName,
    lastName,
    type,
  }) => {
    await addEmployee({
      email,
      type,
      portal_id: PORTAL_ID,
      name_first: firstName,
      name_last: lastName,
    });
    navigate('/');
  };

  console.log((error as ErrorResponse)?.data.message); // we can show this error in the app

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
            type="button"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};
