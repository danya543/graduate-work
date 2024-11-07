import { DragAndDropArea } from '@components/DragAndDropArea/DragAndDropArea';
import { DragHeader } from '@components/DragHeader/DragHeader';
import { useIsMobile } from '@hooks/useIsMobile';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      navigate('/mobile');
    }
  }, [isMobile]);

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
