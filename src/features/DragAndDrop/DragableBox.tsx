import { DraggableBoxProps, ItemType } from '@src/types/DragAndDrop';
import { DragSourceMonitor, useDrag } from 'react-dnd';

export const DraggableBox = ({
  id,
  left,
  top,
  children,
  onDelete,
}: DraggableBoxProps) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemType,
    item: { id, left, top },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={`box-${id}`}
      ref={dragPreview}
      style={{
        left,
        top,
        position: 'absolute',
        opacity: isDragging ? 0.3 : 1,
      }}>
      <div
        ref={drag}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#000',
          position: 'absolute',
          top: 0,
          right: 0,
          cursor: 'move',
        }}
      />
      {children}
      <button onClick={onDelete} style={{ marginTop: '10px' }}>
        Удалить
      </button>
    </div>
  );
};
