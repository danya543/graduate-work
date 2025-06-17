import { useEffect, useRef, useState } from 'react';

import styles from './Storage.module.scss';

export const Storage = ({
  data,
  handleInput,
}: {
  data: number[];
  handleInput: (index: number, value: number) => void;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCellClick = (index: number, value: number) => {
    setEditingIndex(index);
    setEditedValue(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    if (numericValue !== '') {
      const num = parseInt(numericValue, 10);
      if (num >= 0 && num <= 255) {
        setEditedValue(numericValue);
      } else if (num > 255) {
        setEditedValue('255');
      }
    } else {
      setEditedValue('');
    }
  };

  const handleInputBlur = () => {
    (editingIndex || editingIndex === 0) &&
      editedValue &&
      handleInput(editingIndex, +editedValue);
    setEditingIndex(null);
    setEditedValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingIndex]);

  return (
    <section className={styles.container}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`${styles.item}`}
          onClick={() => handleCellClick(index, item)}>
          {editingIndex === index ? (
            <input
              ref={inputRef}
              type="text"
              value={editedValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className={styles.input}
            />
          ) : (
            item.toString(16).padStart(2, '0')
          )}
        </div>
      ))}
    </section>
  );
};
