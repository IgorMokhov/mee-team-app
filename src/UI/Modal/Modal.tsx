import { SubmitHandler, useForm } from 'react-hook-form';
import { EmployeeEditRequest, LocalEmployee } from '../../types/employees';
import { PORTAL_ID } from '../../config/constants';
import styles from './Modal.module.scss';

interface ModalProps {
  selectedEmployee: LocalEmployee;
  onClose: () => void;
  editEmployee: (data: EmployeeEditRequest) => any; // fix type any
}

interface ModalForm {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export const Modal = ({
  selectedEmployee,
  onClose,
  editEmployee,
}: ModalProps) => {
  const { register, handleSubmit } = useForm<ModalForm>({
    defaultValues: {
      email: selectedEmployee.email ? selectedEmployee.email : '',
      phone: selectedEmployee.phone ? selectedEmployee.phone : '',
      firstName: selectedEmployee.firstName ? selectedEmployee.firstName : '',
      lastName: selectedEmployee.lastName ? selectedEmployee.lastName : '',
    },
  });

  const onSubmit: SubmitHandler<ModalForm> = async (data) => {
    const updatedData = {
      id: selectedEmployee.employeeId,
      body: {
        portal_id: PORTAL_ID,
        name_first: data.firstName,
        name_last: data.lastName,
        phone_work: data.phone,
        email_work: data.email,
        local: 'en',
      },
    };

    try {
      await editEmployee(updatedData).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackDropClick}>
      <div className={styles.modal}>
        <h4 className={styles.modal_title}>Editer un compte</h4>
        <form className={styles.modal_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.modal_formGroup}>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="alexander.foley@mail.com"
            />
          </div>
          <div className={styles.modal_formGroup}>
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              {...register('phone', { required: true })}
              type="tel"
              id="phone"
              placeholder="(+237) 696 88 77 55"
            />
          </div>
          <div className={styles.modal_formGroup}>
            <label htmlFor="firstName">Nom</label>
            <input
              {...register('firstName', { required: true })}
              type="text"
              id="firstName"
              placeholder="Alexander"
            />
          </div>
          <div className={styles.modal_formGroup}>
            <label htmlFor="lastName">Prénom</label>
            <input
              {...register('lastName', { required: true })}
              type="text"
              id="lastName"
              placeholder="Foley"
            />
          </div>
          <button type="submit" className={styles.modal_submit}>
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};
