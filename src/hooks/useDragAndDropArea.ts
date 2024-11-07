import { dragableComponents } from '@components/DragAndDropArea/DragAndDropArea';
import {
  Box,
  DragableComponentsTypes,
  ItemType,
  UseDragAndDropAreaHook,
} from '@src/types/DragAndDrop';
import { ModalTypes } from '@src/types/Modal';
import { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

export const useDragAndDropArea = (): UseDragAndDropAreaHook => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [modalType, setModalType] = useState<ModalTypes | null>(null);

  const openModal = (type: ModalTypes) => setModalType(type);
  const closeModal = () => setModalType(null);

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

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    console.log(touch);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    console.log(touch);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    console.log(event);
  };

  const addNewBox = (type: keyof DragableComponentsTypes) => {
    setBoxes(prevBoxes => [
      ...prevBoxes,
      {
        top: 20,
        left: 20,
        type,
        children: dragableComponents[type](),
      },
    ]);
  };

  const deleteBox = (id: number) => {
    setBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== id));
  };

  const handleClearArea = () => setBoxes([]);

  const isAcc = !boxes.some(box => box.type === 'StorageRegistrAcc');
  const isTemp = !boxes.some(box => box.type === 'StorageRegistrTemp');
  const isStorage = !boxes.some(box => box.type === 'Storages');

  return {
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
  };
};
