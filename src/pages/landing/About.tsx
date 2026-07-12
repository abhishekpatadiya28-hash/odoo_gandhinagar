import React from 'react';
import styles from './SecondaryPage.module.css';

export function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About TransitOps</h1>
      <p className={styles.desc}>
        We are on a mission to modernize logistics. Founded in 2026, TransitOps brings enterprise-grade
        software to fleets of all sizes, reducing overhead and improving road safety.
      </p>
    </div>
  );
}
