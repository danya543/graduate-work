import { DragAndDropArea } from '@components/DragAndDropArea/DragAndDropArea';
import { DragHeader } from '@components/DragHeader/DragHeader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <main className={styles.container}>
      <h1>Diploma</h1>
      <DragHeader />
      <DndProvider backend={HTML5Backend}>
        <DragAndDropArea />
      </DndProvider>
    </main>
  );
};
