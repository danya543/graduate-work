import { dragableComponents } from '@components/DragAndDropArea/DragAndDropArea';
import { Box, DragableComponentsTypes } from '@src/types/DragAndDrop';

const LocalStorageService = {
  Boxes: 'boxes',

  loadBoxes(configKey: string): Box[] {
    const storedBoxes = localStorage.getItem(this.Boxes);
    if (storedBoxes) {
      const parsedBoxes = JSON.parse(storedBoxes);
      const boxesToLoad = parsedBoxes[configKey];

      return boxesToLoad.map(
        (box: {
          left: number;
          top: number;
          type: keyof DragableComponentsTypes;
        }) => ({
          left: box.left,
          top: box.top,
          type: box.type,
          children: dragableComponents[box.type](),
        }),
      );
    }
    return [];
  },

  saveBoxes(name: string, boxes: Box[]): void {
    const savedConfig = localStorage.getItem(this.Boxes);
    const data = savedConfig ? JSON.parse(savedConfig) : {};

    const serializableBoxes = boxes.map(box => ({
      left: box.left,
      top: box.top,
      type: box.type,
    }));

    data[name] = serializableBoxes;
    localStorage.setItem(this.Boxes, JSON.stringify(data));
  },

  deleteBoxConfig(configKey: string): void {
    const storedBoxes = localStorage.getItem(this.Boxes);
    if (storedBoxes) {
      const data = JSON.parse(storedBoxes);
      delete data[configKey];
      localStorage.setItem(this.Boxes, JSON.stringify(data));
    }
  },

  getConfigKeys(): string[] {
    const storedBoxes = localStorage.getItem(this.Boxes);
    return storedBoxes ? Object.keys(JSON.parse(storedBoxes)) : [];
  },

  clearAll(): void {
    localStorage.removeItem(this.Boxes);
  },
};

export default LocalStorageService;
