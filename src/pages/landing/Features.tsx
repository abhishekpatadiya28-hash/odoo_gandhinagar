import React from 'react';
import styles from './SecondaryPage.module.css';

export function Features() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Powerful Features for Fleet Ops</h1>
      <p className={styles.desc}>
        Explore the comprehensive toolset designed to make your logistics operations seamless, 
        safe, and highly profitable.
      </p>
    </div>
  );
}
