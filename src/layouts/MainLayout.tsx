import { Outlet } from 'react-router-dom';
import { Container } from '../UI/Container/Container';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <main className={styles.layout}>
      <Container>
        <Outlet />
      </Container>
    </main>
  );
};
