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
  StorageRegist: (props: {
    text: string;
    addresses: StorageRegister;
  }) => JSX.Element;
  GeneratorRegist: (props: {
    text: string;
    generator_addresses: GeneratorRegister;
  }) => JSX.Element;
  ALU: (props: { text: string; ALU_addresses: ALUBlock }) => JSX.Element;
}

export type ComponentProps = {
  text?: string;
  addresses?: StorageRegister;
  generator_addresses?: GeneratorRegister;
  ALU_addresses?: ALUBlock;
};

export interface Box {
  top: number;
  left: number;
  type: DragableComponents;
  children: JSX.Element;
}
export type DragableComponents =
  | 'Storages'
  | 'StorageRegist'
  | 'ALU'
  | 'GeneratorRegist';
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
  addNewBox: (
    type: keyof DragableComponentsTypes,
    props?: ComponentProps,
  ) => void;
  deleteBox: (id: number) => void;
  handleClearArea: () => void;
  setBoxes: Dispatch<SetStateAction<Box[]>>;
  isStorage: boolean;
  isNew: boolean;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  isALU: boolean;
  setIsALU: Dispatch<SetStateAction<boolean>>;
}

export type ALUBlock = { in1: string; in2: string; out: string };

export type GeneratorRegister = {
  currentValue: number;
  data_bus: string;
};

export type StorageRegister = {
  current: string;
  data_bus: string;
};

export type RegisterAddresses = GeneratorRegister | StorageRegister;
