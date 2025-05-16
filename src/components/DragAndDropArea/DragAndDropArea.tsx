import { ModalType } from '@components/constants';
import { ModalPortal } from '@components/ModalPortal/ModalPortal';
import { NewRegister } from '@components/ModalPortal/NewRegister';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { useDragAndDropArea } from '@hooks/useDragAndDropArea';
import { DragableComponentsTypes } from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';

import styles from './DragAndDropArea.module.scss';

export const dragableComponents: DragableComponentsTypes = {
  Storages: () => <Storages />,
  StorageRegist: (props: {
    text: string;
    addresses: { current: string; from: string; to: string };
  }) => <StorageRegistr text={props.text} addresses={props.addresses} />,
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
    isStorage,
    isNew,
    setIsNew,
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
        <Button
          text={'New register'}
          onclick={() => setIsNew(true)}
          classname={styles.addBtn}
        />
        {isNew && (
          <NewRegister
            onClose={() => setIsNew(false)}
            addNewRegister={(name, value) =>
              addNewBox('StorageRegist', { text: name, addresses: value })
            }
          />
        )}
        {isStorage && (
          <Button
            text={'Storages'}
            onclick={() => addNewBox('Storages')}
            classname={styles.addBtn}
          />
        )}
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
