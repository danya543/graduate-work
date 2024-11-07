import React, { useRef, useState } from 'react';

const miniBlockStyle: React.CSSProperties = {
  position: 'absolute',
  width: '20px',
  height: '20px',
  borderRadius: '3px',
  cursor: 'pointer',
};

const miniBlockColors = ['red', 'green', 'blue'];

export interface ConnectBoxProps {
  id: string;
  addArrow: (arrow: { start: string; end: string; color: string }) => void;
  boxId: string;
  miniBlockIndex: number;
}

export const ConnectBox = ({
  id,
  addArrow,
  boxId,
  miniBlockIndex,
}: ConnectBoxProps) => {
  const connectBoxRef = useRef<HTMLDivElement>(null);
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <div
      id={id}
      ref={connectBoxRef}
      style={{
        ...miniBlockStyle,
        background: miniBlockColors[miniBlockIndex],
        left: '90%',
        top: `${miniBlockIndex * 30 + 15}px`,
      }}
      draggable
      onDragStart={e => {
        setBeingDragged(true);
        e.dataTransfer.setData('arrow', `${boxId}-miniBlock${miniBlockIndex}`);
        e.dataTransfer.setData('color', miniBlockColors[miniBlockIndex]);
      }}
      onDragEnd={() => {
        setBeingDragged(false);
        console.log(beingDragged);
      }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const draggedId = e.dataTransfer.getData('arrow');
        const color = e.dataTransfer.getData('color');
        if (!draggedId.startsWith(boxId)) {
          addArrow({ start: draggedId, end: id, color });
        }
      }}
    />
  );
};
