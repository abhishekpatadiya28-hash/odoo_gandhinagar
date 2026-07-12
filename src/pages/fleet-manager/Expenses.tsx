import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export function Expenses() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Expenses & Cost Tracking</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Monitor operational costs, fuel expenses, and driver payroll.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Fleet Expense Overview</CardTitle>
          </CardHeader>
          <CardContent>
             <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)' }}>
               Expense Chart Visualization
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
