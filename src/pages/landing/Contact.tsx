import React from 'react';
import styles from './SecondaryPage.module.css';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.desc} style={{ marginBottom: '2rem' }}>
        Interested in deploying TransitOps for your fleet? Reach out to our sales team for a custom demo.
      </p>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Input label="Name" placeholder="John Doe" />
        <Input label="Work Email" type="email" placeholder="john@logistics.com" />
        <Input label="Company Size" placeholder="e.g. 50-100 vehicles" />
        <Button size="lg" style={{ marginTop: '1rem' }}>Request Demo</Button>
      </form>
    </div>
  );
}
