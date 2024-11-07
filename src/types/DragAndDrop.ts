import { Dispatch, LegacyRef, SetStateAction } from 'react';

import { ModalTypes } from './Modal';

export interface DraggableBoxProps {
  id: number;
  children: React.ReactNode;
  left: number;
  top: number;
  onDelete: () => void;
  moveBox: (id: string, left: number, top: number) => void;
}

export interface DragableComponentsTypes {
  Storages: () => JSX.Element;
  StorageRegistrAcc: () => JSX.Element;
  StorageRegistrTemp: () => JSX.Element;
}

export interface Box {
  top: number;
  left: number;
  type: DragableComponents;
  children: JSX.Element;
}
export type DragableComponents =
  | 'PC'
  | 'Storages'
  | 'StorageRegistrAcc'
  | 'StorageRegistrTemp';

export const ItemType = 'BOX';

//hook
export interface UseDragAndDropAreaHook {
  boxes: Box[];
  modalType: ModalTypes | null;
  openModal: (type: ModalTypes) => void;
  closeModal: () => void;
  drop: LegacyRef<HTMLDivElement> | undefined;
  moveBox: (id: string, left: number, top: number) => void;
  handleTouchStart: (event: React.TouchEvent) => void;
  handleTouchMove: (event: React.TouchEvent) => void;
  handleTouchEnd: (event: React.TouchEvent) => void;
  addNewBox: (type: keyof DragableComponentsTypes) => void;
  deleteBox: (id: number) => void;
  handleClearArea: () => void;
  setBoxes: Dispatch<SetStateAction<Box[]>>;
  isAcc: boolean;
  isTemp: boolean;
  isStorage: boolean;
}
