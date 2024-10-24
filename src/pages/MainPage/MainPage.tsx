import { Storages } from '@components/Storages/Storages';
import { Form } from '@utils/Form';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <main className={styles.container}>
      <h1>Diploma</h1>
      <Form placeholder={'Enter your number'} />
      <Storages />
    </main>
  );
};
