/* import { DraggableBoxProps, ItemType } from '@src/types/DragAndDrop';
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
          borderRadius: '0 10px 0 0',
          position: 'absolute',
          top: 0,
          right: 0,
          cursor: 'move',
          opacity: isDragging ? 0.3 : 1,
        }}
      />
      {children}
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};
 */

import { ConnectBox } from '@features/ConnectBox/ConnectBox';
import { DraggableBoxProps, ItemType } from '@src/types/DragAndDrop';
import { useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import Xarrow from 'react-xarrows';

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

  const [arrows, setArrows] = useState<
    { start: string; end: string; color: string }[]
  >([]);

  const addArrow = (arrow: { start: string; end: string; color: string }) => {
    setArrows(prevArrows => [
      ...prevArrows,
      { start: arrow.start, end: arrow.end, color: arrow.color },
    ]);
  };

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
          borderRadius: '0 10px 0 0',
          position: 'absolute',
          top: 0,
          right: 0,
          cursor: 'move',
          opacity: isDragging ? 0.3 : 1,
        }}
      />
      {children}
      <button onClick={onDelete}>Удалить</button>

      {[0, 1, 2].map(index => (
        <ConnectBox
          key={`${id}-miniBlock${index}`}
          id={`${id}-miniBlock${index}`}
          addArrow={addArrow}
          boxId={String(id)}
          miniBlockIndex={index}
        />
      ))}

      {arrows.map((arrowProps, idx) => (
        <Xarrow key={idx} {...arrowProps} />
      ))}
    </div>
  );
};
