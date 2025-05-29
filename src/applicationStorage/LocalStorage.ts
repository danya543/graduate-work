import { dragableComponents } from '@components/DragAndDropArea/DragAndDropArea';
import {
  Box,
  ComponentProps,
  DragableComponentsTypes,
} from '@src/types/DragAndDrop';

const LocalStorageService = {
  Boxes: 'boxes',

  loadBoxes(configKey: string): Box[] {
    const storedBoxes = localStorage.getItem(this.Boxes);
    if (storedBoxes) {
      const parsedBoxes = JSON.parse(storedBoxes);
      const boxesToLoad = parsedBoxes[configKey];

      const createElement = (
        type: keyof DragableComponentsTypes,
        props?: ComponentProps,
      ) => {
        switch (type) {
          case 'StorageRegist':
            return dragableComponents[type](
              props as {
                text: string;
                addresses: { current: string; data_bus: string };
              },
            );
          default:
            return dragableComponents[type]();
        }
      };
      return boxesToLoad.map(
        (box: {
          left: number;
          top: number;
          type: keyof DragableComponentsTypes;
          props?: ComponentProps;
        }) => ({
          left: box.left,
          top: box.top,
          type: box.type,
          children: createElement(box.type, box.props),
        }),
      );
    }
    return [];
  },

  saveBoxes(name: string, boxes: Box[]): void {
    const savedConfig = localStorage.getItem(this.Boxes);
    const data = savedConfig ? JSON.parse(savedConfig) : {};

    const serializableBoxes = boxes.map(box => {
      const { left, top, type, children } = box;
      const props =
        (children as unknown as { props: ComponentProps })?.props ?? {};
      return { left, top, type, props };
    });

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
