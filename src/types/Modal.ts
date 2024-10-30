import { Box } from './DragAndDrop';

export interface ModalPortalCommonProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalPortalProps {
  isOpen: boolean;
  type: 'load' | 'save';
  boxes: Box[];
  setBoxes: (loadedBoxes: Box[]) => void;
  onClose: () => void;
}

export interface ModalProps {
  type: 'load' | 'save';
  boxes: Box[];
  setBoxes: (loadedBoxes: Box[]) => void;
  onClose: () => void;
}
