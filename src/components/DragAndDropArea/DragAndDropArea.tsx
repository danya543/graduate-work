import { ALU } from '@components/ALU/ALU';
import { ModalType } from '@components/constants';
import { ModalPortal } from '@components/ModalPortal/ModalPortal';
import { NewALU } from '@components/ModalPortal/NewALU';
import { NewRegister } from '@components/ModalPortal/NewRegister';
import { GeneratorRegist } from '@components/StorageRegistr/GeneratorRegist';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { useDragAndDropArea } from '@hooks/useDragAndDropArea';
import {
  ALUBlock,
  DragableComponentsTypes,
  GeneratorRegister,
  StorageRegister,
} from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';

import styles from './DragAndDropArea.module.scss';

export const dragableComponents: DragableComponentsTypes = {
  Storages: () => <Storages />,
  StorageRegist: (props: { text: string; addresses: StorageRegister }) => (
    <StorageRegistr text={props.text} addresses={props.addresses} />
  ),
  GeneratorRegist: (props: {
    text: string;
    generator_addresses: GeneratorRegister;
  }) => (
    <GeneratorRegist
      text={props.text}
      generator_addresses={props.generator_addresses}
    />
  ),
  ALU: (props: { text: string; ALU_addresses: ALUBlock }) => (
    <ALU text={props.text} ALU_addresses={props.ALU_addresses} />
  ),
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
    isALU,
    setIsALU,
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
          text={'Добавить регистр'}
          onclick={() => setIsNew(true)}
          classname={styles.addBtn}
        />
        <Button
          text={'Добавить АЛУ'}
          onclick={() => setIsALU(true)}
          classname={styles.addBtn}
        />
        {isNew && (
          <NewRegister
            onClose={() => setIsNew(false)}
            addNewRegister={(name, value) => {
              if (!('current' in value)) {
                const num = Math.floor(Math.random() * 100) + 1;
                addNewBox('GeneratorRegist', {
                  text: name,
                  generator_addresses: { ...value, currentValue: num },
                });
              } else {
                addNewBox('StorageRegist', {
                  text: name,
                  addresses: value,
                });
              }
            }}
          />
        )}
        {isALU && (
          <NewALU
            onClose={() => setIsALU(false)}
            addNewALU={(name, value) =>
              addNewBox('ALU', { text: name, ALU_addresses: value })
            }
          />
        )}
        {isStorage && (
          <Button
            text={'Добавить память'}
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
