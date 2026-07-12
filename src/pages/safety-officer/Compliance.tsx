import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { useDriverStore } from '../../store/useDriverStore';
import { useVehicleStore } from '../../store/useVehicleStore';
import { Badge } from '../../components/ui/Badge';

export function Compliance() {
  const drivers = useDriverStore(state => state.drivers);
  const vehicles = useVehicleStore(state => state.vehicles);

  const today = new Date();

  // Find compliance alerts
  const alerts: { type: 'danger' | 'warning'; title: string; desc: string; category: string }[] = [];

  drivers.forEach(d => {
    const expiry = new Date(d.licenseExpiry);
    if (expiry < today) {
      alerts.push({
        type: 'danger',
        category: 'Driver License',
        title: `License Expired: ${d.name}`,
        desc: `Driver license (${d.licenseNumber}) expired on ${d.licenseExpiry}. Driver should be suspended immediately.`
      });
    } else if (expiry.getTime() - today.getTime() <= 30 * 24 * 60 * 60 * 1000) {
      alerts.push({
        type: 'warning',
        category: 'Driver License',
        title: `License Expiring Soon: ${d.name}`,
        desc: `Driver license expires on ${d.licenseExpiry} (in less than 30 days).`
      });
    }

    if (d.safetyScore < 70) {
      alerts.push({
        type: 'danger',
        category: 'Driver Safety',
        title: `Critical Safety Score: ${d.name}`,
        desc: `Safety score is at ${d.safetyScore}/100. Mandatory safety review or suspension required.`
      });
    } else if (d.safetyScore < 85) {
      alerts.push({
        type: 'warning',
        category: 'Driver Safety',
        title: `Low Safety Score: ${d.name}`,
        desc: `Safety score is at ${d.safetyScore}/100. Monitor driving performance.`
      });
    }
  });

  vehicles.forEach(v => {
    if (v.status === 'Retired') {
      alerts.push({
        type: 'warning',
        category: 'Vehicle Status',
        title: `Vehicle Retired: ${v.make} ${v.model} (${v.licensePlate})`,
        desc: `This vehicle is retired and must not be scheduled for any future trips.`
      });
    }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Compliance Alerts</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Identify and resolve compliance issues and driver safety risks.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Compliance Logs</CardTitle>
          <CardDescription>
            {alerts.length} compliance warnings requiring attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  gap: 'var(--space-4)', 
                  padding: 'var(--space-4)', 
                  backgroundColor: alert.type === 'danger' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)', 
                  border: `1px solid ${alert.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)'}`,
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ color: alert.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                  {alert.type === 'danger' ? <AlertOctagon size={24} /> : <AlertTriangle size={24} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text-main)' }}>{alert.title}</h4>
                    <Badge variant={alert.type === 'danger' ? 'danger' : 'warning'}>{alert.category}</Badge>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{alert.desc}</p>
                </div>
              </div>
            ))}

            {alerts.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
                <ShieldCheck size={48} style={{ color: 'var(--color-success)', margin: '0 auto var(--space-4) auto' }} />
                <h3 style={{ margin: 0, fontWeight: 600 }}>All Systems Compliant</h3>
                <p style={{ margin: 'var(--space-2) 0 0 0', color: 'var(--color-text-secondary)' }}>No active driver violations or expiring licenses found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
