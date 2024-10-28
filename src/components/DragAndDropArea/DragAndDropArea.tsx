/* import { PC } from '@components/PC/PC';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { Box, DragableComponents, ItemType } from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import styles from './DragAndDropArea.module.scss';

const dragableComponents = {
  PC: (id: number) => <PC counter={id} />,
  Storages: () => <Storages />,
  StorageRegistr: (text, value) => <StorageRegistr text={text} value={value} />,
};

const saveBoxesToLocalStorage = (name: string, boxes: Box[]) => {
  const savedConfig = localStorage.getItem('boxes');
  const data = savedConfig ? JSON.parse(savedConfig) : {};
  let configName = name;
  while (Object.keys(data).some(el => el === configName)) {
    configName = prompt('Error! This name is already taken') || '';
  }

  const serializableBoxes = boxes.map(box => ({
    left: box.left,
    top: box.top,
    type: box.type,
  }));

  data[name] = serializableBoxes;

  localStorage.setItem('boxes', JSON.stringify(data));
  alert('success');
};

const loadBoxesFromLocalStorage = (): Box[] => {
  const storedBoxes = localStorage.getItem('boxes');
  if (storedBoxes) {
    const parsedBoxes = JSON.parse(storedBoxes);
    const choice = prompt(
      Object.keys(parsedBoxes)
        .map((el, index) => `${index + 1}. ${el}`)
        .join('\n'),
    );

    const length = Object.keys(parsedBoxes).length;
    const regex = new RegExp(
      length > 9 ? `^(1[0-${length % 10}]|[1-9])$` : `^[0-${length}]+$`,
    );

    if (choice && regex.test(choice)) {
      const firstKey = Object.keys(parsedBoxes)[choice ? +choice - 1 : 0];
      const boxesToLoad = parsedBoxes[firstKey];

      return boxesToLoad.map(
        (box: { left: number; top: number; type: string }, index: number) => ({
          left: box.left,
          top: box.top,
          type: box.type,
          children: dragableComponents[box.type](index),
        }),
      );
    }
  }
  return [];
};

export const DragAndDropArea = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { top: 20, left: 20, type: 'PC', children: <PC counter={1} /> },
    { top: 80, left: 80, type: 'Storages', children: <Storages /> },
    { top: 140, left: 140, type: 'Storages', children: <Storages /> },
  ]);

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
    setBoxes(prevBoxes =>
      prevBoxes.map((box, index) =>
        index === +id ? { ...box, left, top } : box,
      ),
    );
  };

  const addNewBox = (type: DragableComponents) => {
    const newId = boxes.length + 1;

    setBoxes(prevBoxes => [
      ...prevBoxes,
      {
        top: 20,
        left: 20,
        type,
        children: dragableComponents[type](newId),
      },
    ]);
  };

  const deleteBox = (id: number) => {
    setBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== id));
  };

  const handleSave = () => {
    let name = '';
    while (!name) {
      name = prompt('Name it') || '';
    }
    saveBoxesToLocalStorage(name, boxes);
  };

  const handleLoad = () => {
    const loadedBoxes = loadBoxesFromLocalStorage();
    if (loadedBoxes.length > 0) {
      setBoxes(loadedBoxes);
    } else {
      alert('Нет сохраненных конфигураций');
    }
  };

  return (
    <div id="drag-area" ref={drop} className={styles.area}>
      <Button
        text={'Добавить PC'}
        onclick={() => addNewBox('PC')}
        classname={styles.addButton}
      />
      <Button
        text={'Добавить Storages'}
        onclick={() => addNewBox('Storages')}
        classname={styles.addButton}
      />
      <Button onclick={handleSave} text={'Сохранить'} />
      <Button onclick={handleLoad} text={'Загрузить'} />
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
 */
import { PC } from '@components/PC/PC';
import { StorageRegistr } from '@components/StorageRegistr/StorageRegistr';
import { Storages } from '@components/Storages/Storages';
import { DraggableBox } from '@features/DragAndDrop/DragableBox';
import { Box, DragableComponents, ItemType } from '@src/types/DragAndDrop';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import styles from './DragAndDropArea.module.scss';

// Определяем типы для dragableComponents
interface DragableComponentsTypes {
  PC: (id: number) => JSX.Element;
  Storages: () => JSX.Element;
  StorageRegistr: (text: string, value: number) => JSX.Element;
}

const dragableComponents: DragableComponentsTypes = {
  PC: (id: number) => <PC counter={id} />,
  Storages: () => <Storages />,
  StorageRegistr: (text: string, value: number) => (
    <StorageRegistr text={text} value={value} />
  ),
};

const saveBoxesToLocalStorage = (name: string, boxes: Box[]) => {
  const savedConfig = localStorage.getItem('boxes');
  const data = savedConfig ? JSON.parse(savedConfig) : {};
  let configName = name;
  while (Object.keys(data).some(el => el === configName)) {
    configName = prompt('Error! This name is already taken') || '';
  }

  const serializableBoxes = boxes.map(box => ({
    left: box.left,
    top: box.top,
    type: box.type,
  }));

  data[configName] = serializableBoxes;

  localStorage.setItem('boxes', JSON.stringify(data));
  alert('success');
};

const loadBoxesFromLocalStorage = (): Box[] => {
  const storedBoxes = localStorage.getItem('boxes');
  if (storedBoxes) {
    const parsedBoxes = JSON.parse(storedBoxes);
    const choice = prompt(
      Object.keys(parsedBoxes)
        .map((el, index) => `${index + 1}. ${el}`)
        .join('\n'),
    );

    const length = Object.keys(parsedBoxes).length;
    const regex = new RegExp(
      length > 9 ? `^(1[0-${length % 10}]|[1-9])$` : `^[0-${length}]+$`,
    );

    if (choice && regex.test(choice)) {
      const firstKey = Object.keys(parsedBoxes)[+choice - 1];
      const boxesToLoad = parsedBoxes[firstKey];

      return boxesToLoad.map(
        (
          box: {
            left: number;
            top: number;
            type: keyof DragableComponentsTypes;
          },
          index: number,
        ) => ({
          left: box.left,
          top: box.top,
          type: box.type,
          children: dragableComponents[box.type](index + 1), // Передаем индекс + 1 для корректной работы с PC
        }),
      );
    }
  }
  return [];
};

export const DragAndDropArea = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { top: 20, left: 20, type: 'PC', children: <PC counter={1} /> },
    { top: 80, left: 80, type: 'Storages', children: <Storages /> },
    { top: 140, left: 140, type: 'Storages', children: <Storages /> },
  ]);

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
    setBoxes(prevBoxes =>
      prevBoxes.map((box, index) =>
        index === +id ? { ...box, left, top } : box,
      ),
    );
  };

  const addNewBox = (type: keyof DragableComponentsTypes) => {
    const newId = boxes.length + 1;

    setBoxes(prevBoxes => [
      ...prevBoxes,
      {
        top: 20,
        left: 20,
        type,
        children: dragableComponents[type](newId),
      },
    ]);
  };

  const deleteBox = (id: number) => {
    setBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== id));
  };

  const handleSave = () => {
    let name = '';
    while (!name) {
      name = prompt('Name it') || '';
    }
    saveBoxesToLocalStorage(name, boxes);
  };

  const handleLoad = () => {
    const loadedBoxes = loadBoxesFromLocalStorage();
    if (loadedBoxes.length > 0) {
      setBoxes(loadedBoxes);
    } else {
      alert('Нет сохраненных конфигураций');
    }
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
        <Button onclick={handleSave} text={'Сохранить'} />
        <Button onclick={handleLoad} text={'Загрузить'} />
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
