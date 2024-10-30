import { ModalType } from '@components/constants';
import { ModalPortal } from '@components/ModalPortal/ModalPortal';
import { PC } from '@components/PC/PC';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { Box, DragableComponentsTypes, ItemType } from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import styles from './DragAndDropArea.module.scss';

export const dragableComponents: DragableComponentsTypes = {
  PC: (id: number) => <PC counter={id} />,
  Storages: () => <Storages />,
  StorageRegistr: (text: string, value: number) => (
    <StorageRegistr text={text} value={value} />
  ),
};

export const DragAndDropArea = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { top: 20, left: 20, type: 'PC', children: <PC counter={1} /> },
    { top: 80, left: 80, type: 'Storages', children: <Storages /> },
    { top: 140, left: 140, type: 'Storages', children: <Storages /> },
  ]);

  const [modalType, setModalType] = useState<'load' | 'save' | null>(null);

  const openModal = (type: 'load' | 'save') => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (
      item: { id: string; left: number; top: number },
      monitor: DropTargetMonitor,
    ) => {
      const offset = monitor.getSourceClientOffset();
      const element = document.getElementById(`box-${item.id}`);
      if (offset && element) {
        const parentRect = document
          .getElementById('drag-area')!
          .getBoundingClientRect();

        const { width } = element.getBoundingClientRect();

        const newLeft = offset.x - parentRect.left - width + 20;
        const newTop = offset.y - parentRect.top;

        moveBox(item.id, newLeft, newTop);
      }
    },
  }));

  const moveBox = (id: string, left: number, top: number) => {
    const container = document.getElementById('drag-area');
    const boxElement = document.getElementById(`box-${id}`);

    if (container && boxElement) {
      const containerRect = container.getBoundingClientRect();
      const boxRect = boxElement.getBoundingClientRect();

      const newLeft = Math.min(
        containerRect.width - boxRect.width,
        Math.max(0, left),
      );
      const newTop = Math.min(
        containerRect.height - boxRect.height,
        Math.max(0, top),
      );

      setBoxes(prevBoxes =>
        prevBoxes.map((box, index) =>
          index === +id ? { ...box, left: newLeft, top: newTop } : box,
        ),
      );
    }
  };

  const addNewBox = (type: keyof DragableComponentsTypes) => {
    const newId = boxes.length + 1;

    setBoxes(prevBoxes => [
      ...prevBoxes,
      {
        top: 20,
        left: 20,
        type,
        children:
          type === 'StorageRegistr'
            ? dragableComponents[type]('Sample Text', 10)
            : dragableComponents[type](newId),
      },
    ]);
  };

  const deleteBox = (id: number) => {
    setBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== id));
  };

  const handleClearArea = () => {
    setBoxes([]);
  };

  return (
    <div id="drag-area" ref={drop} className={styles.area}>
      <div className={styles.header}>
        <Button
          text={'PC'}
          onclick={() => addNewBox('PC')}
          classname={styles.addButton}
        />
        <Button
          text={'Storages'}
          onclick={() => addNewBox('Storages')}
          classname={styles.addButton}
        />
        <Button onclick={() => openModal('save')} text={'Сохранить'} />
        <Button onclick={() => openModal('load')} text={'Загрузить'} />
        {modalType == ModalType.Save && (
          <ModalPortal
            type={ModalType.Save}
            onClose={closeModal}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        )}
        {modalType == ModalType.Load && (
          <ModalPortal
            type={ModalType.Load}
            onClose={closeModal}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        )}
        <Button onclick={handleClearArea} text={'clear'} />
      </div>
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
    </div>
  );
};
