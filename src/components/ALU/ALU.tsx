import { useEffect, useState } from 'react';

import styles from './ALU.module.scss';

export const ALU = ({
  text,
  ALU_addresses,
}: {
  text: string;
  ALU_addresses: { in1: string; in2: string; out: string };
}) => {
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`${styles.container} ${styles[text]}`}>
      <h1>ALU {text}</h1>
      <p className={styles.in1}>{ALU_addresses.in1}</p>
      <p className={styles.in2}>{ALU_addresses.in2}</p>
      <p className={styles.out}>{ALU_addresses.out}</p>
    </div>
  );
};
