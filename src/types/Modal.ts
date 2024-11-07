import { Box } from './DragAndDrop';

export type ModalTypes = 'load' | 'save' | 'info';

export interface ModalPortalProps {
  type: ModalTypes;
  boxes?: Box[];
  setBoxes?: (loadedBoxes: Box[]) => void;
  onClose: () => void;
  setInputValue?: (value: string) => void;
}

export interface ModalProps {
  type: ModalTypes;
  boxes: Box[];
  setBoxes: (loadedBoxes: Box[]) => void;
  onClose: () => void;
}

export type ModalInfoType = Required<
  Pick<ModalPortalProps, 'type' | 'onClose' | 'setInputValue'>
>;
