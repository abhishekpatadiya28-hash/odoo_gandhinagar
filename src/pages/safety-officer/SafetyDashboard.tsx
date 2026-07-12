import React from 'react';
import { ShieldAlert, AlertTriangle, FileCheck, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { useDriverStore } from '../../store/useDriverStore';

export function SafetyDashboard() {
  const drivers = useDriverStore(state => state.drivers);
  
  const lowScoreDrivers = drivers.filter(d => d.safetyScore < 80).length;
  const expiringLicenses = drivers.filter(d => new Date(d.licenseExpiry) < new Date(Date.now() + 30*24*60*60*1000)).length;
  const suspendedDrivers = drivers.filter(d => d.status === 'Suspended').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Safety & Compliance Dashboard</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Monitor fleet safety scores, incidents, and license compliance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Total Drivers</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{drivers.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card style={expiringLicenses > 0 ? { border: '1px solid var(--color-warning)' } : {}}>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', borderRadius: 'var(--radius-md)' }}>
              <FileCheck size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Expiring Licenses (30d)</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{expiringLicenses}</h3>
            </div>
          </CardContent>
        </Card>

        <Card style={lowScoreDrivers > 0 ? { border: '1px solid var(--color-danger)' } : {}}>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Low Safety Scores (&lt;80)</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{lowScoreDrivers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card style={suspendedDrivers > 0 ? { border: '1px solid var(--color-danger)' } : {}}>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Suspended Drivers</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{suspendedDrivers}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Tracked safety infractions and hard braking events</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)' }}>
              Safety Telematics Feed placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
