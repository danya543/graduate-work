// src/components/MiniBlock.tsx
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
        background: miniBlockColors[miniBlockIndex], // Set color based on index
        left: '90%', // Positioning mini-blocks to the right
        top: `${miniBlockIndex * 30 + 15}px`, // Distributing mini-blocks vertically
      }}
      draggable
      onDragStart={e => {
        setBeingDragged(true);
        e.dataTransfer.setData('arrow', `${boxId}-miniBlock${miniBlockIndex}`);
        e.dataTransfer.setData('color', miniBlockColors[miniBlockIndex]); // Store color for the arrow
      }}
      onDragEnd={() => {
        setBeingDragged(false);
      }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const draggedId = e.dataTransfer.getData('arrow');
        const color = e.dataTransfer.getData('color');
        if (!draggedId.startsWith(boxId)) {
          // Prevent connecting to itself
          addArrow({ start: draggedId, end: id, color });
        }
      }}
    />
  );
};
