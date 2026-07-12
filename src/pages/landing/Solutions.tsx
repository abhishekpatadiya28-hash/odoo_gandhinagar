import React from 'react';
import styles from './SecondaryPage.module.css';

export function Solutions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Solutions for Every Role</h1>
      <p className={styles.desc}>
        Whether you are a Fleet Manager, Driver, Safety Officer, or Financial Analyst,
        TransitOps has tailored views and workflows to support your day-to-day needs.
      </p>
    </div>
  );
}
