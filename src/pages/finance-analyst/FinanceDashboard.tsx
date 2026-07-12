import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export function FinanceDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Financial Analytics</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>High-level overview of fleet revenue, expenses, and ROI.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Costs (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
             <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)' }}>
               Financial Chart Visualization (Recharts)
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
