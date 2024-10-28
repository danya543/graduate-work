export interface DraggableBoxProps {
  id: number;
  children: React.ReactNode;
  left: number;
  top: number;
  onDelete: () => void;
  moveBox: (id: string, left: number, top: number) => void;
}

export interface Box {
  top: number;
  left: number;
  type: DragableComponents;
  children: JSX.Element;
}
export type DragableComponents = 'PC' | 'Storages' | 'StorageRegistr';

export const ItemType = 'BOX';
