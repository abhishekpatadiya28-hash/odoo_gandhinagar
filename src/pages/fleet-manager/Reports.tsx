import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export function Reports() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Reports & Analytics</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Generate comprehensive reports on fleet performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Fuel Efficiency Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-secondary)' }}>Analyze fuel consumption per vehicle and route.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Driver Safety Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-secondary)' }}>Review safety scores and incidents.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Asset Utilization Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-secondary)' }}>Measure ROI and downtime of the fleet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
