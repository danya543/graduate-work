import { ModalType, StorageRegistrTypes } from '@components/constants';
import { ModalPortal } from '@components/ModalPortal/ModalPortal';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { useDragAndDropArea } from '@hooks/useDragAndDropArea';
import { DragableComponentsTypes } from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';

import styles from './DragAndDropArea.module.scss';

export const dragableComponents: DragableComponentsTypes = {
  Storages: () => <Storages />,
  StorageRegistrAcc: () => <StorageRegistr text={StorageRegistrTypes.ACC} />,
  StorageRegistrTemp: () => <StorageRegistr text={StorageRegistrTypes.RVH} />,
};

export const DragAndDropArea = () => {
  const {
    boxes,
    setBoxes,
    modalType,
    openModal,
    closeModal,
    drop,
    moveBox,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    addNewBox,
    deleteBox,
    handleClearArea,
    isAcc,
    isTemp,
    isStorage,
  } = useDragAndDropArea();

  return (
    <section
      id="drag-area"
      ref={drop}
      className={styles.area}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className={styles.header}>
        {isAcc && (
          <Button
            text={'ACC'}
            onclick={() => addNewBox('StorageRegistrAcc')}
            classname={styles.addBtn}
          />
        )}
        {isTemp && (
          <Button
            text={'RVH'}
            onclick={() => addNewBox('StorageRegistrTemp')}
            classname={styles.addBtn}
          />
        )}
        {isStorage && (
          <Button
            text={'Storages'}
            onclick={() => addNewBox('Storages')}
            classname={styles.addBtn}
          />
        )}
        {/* <Button
          text={'Компоненты'}
          classname={styles.showBtns}
          onclick={handleMainButtonClick}
        /> */}
        <Button
          onclick={() => openModal('save')}
          text={'Сохранить'}
          classname={styles.saveBtn}
        />
        <Button
          onclick={() => openModal('load')}
          text={'Загрузить'}
          classname={styles.loadBtn}
        />
        <Button
          onclick={handleClearArea}
          text={'Очистить'}
          classname={styles.clearBtn}
        />
      </div>

      {modalType === ModalType.Save && (
        <ModalPortal
          type={modalType}
          onClose={closeModal}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      )}
      {modalType === ModalType.Load && (
        <ModalPortal
          type={ModalType.Load}
          onClose={closeModal}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      )}
      {boxes.map((dragItem, index) => (
        <DraggableBox
          key={index}
          id={index}
          left={dragItem.left}
          top={dragItem.top}
          moveBox={moveBox}
          onDelete={() => deleteBox(index)}>
          {dragItem.children}
        </DraggableBox>
      ))}
    </section>
  );
};
