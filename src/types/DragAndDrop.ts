export interface DraggableBoxProps {
  id: number;
  children: React.ReactNode;
  left: number;
  top: number;
  onDelete: () => void;
  moveBox: (id: string, left: number, top: number) => void;
}

export interface DragableComponentsTypes {
  PC: (id: number) => JSX.Element;
  Storages: () => JSX.Element;
  StorageRegistr: (text: string, value: number) => JSX.Element;
}

export interface Box {
  top: number;
  left: number;
  type: DragableComponents;
  children: JSX.Element;
}
export type DragableComponents = 'PC' | 'Storages' | 'StorageRegistr';

export const ItemType = 'BOX';
