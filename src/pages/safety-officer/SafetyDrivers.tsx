import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useDriverStore } from '../../store/useDriverStore';

export function SafetyDrivers() {
  const { drivers, updateDriver } = useDriverStore();

  const handleToggleSuspend = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Suspended' ? 'Available' : 'Suspended';
    updateDriver(id, { status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available': return <Badge variant="success">Available</Badge>;
      case 'On Trip': return <Badge variant="primary">On Trip</Badge>;
      case 'Off Duty': return <Badge variant="default">Off Duty</Badge>;
      case 'Suspended': return <Badge variant="danger">Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isLicenseExpired = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Driver Safety & Licenses</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Monitor compliance, manage suspensions, and check license statuses.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>License & Safety Audit</CardTitle>
          <CardDescription>Review credentials, safety metrics, and actions.</CardDescription>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <TableContainer style={{ border: 'none', borderRadius: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>License No.</TableHead>
                  <TableHead>License Expiry</TableHead>
                  <TableHead>Safety Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => {
                  const expired = isLicenseExpired(driver.licenseExpiry);
                  const expiringSoon = isLicenseExpiringSoon(driver.licenseExpiry);
                  
                  return (
                    <TableRow key={driver.id}>
                      <TableCell style={{ fontWeight: 500 }}>{driver.name}</TableCell>
                      <TableCell>{driver.licenseNumber}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          <span style={{
                            color: expired ? 'var(--color-danger)' : expiringSoon ? 'var(--color-warning)' : 'inherit',
                            fontWeight: expired || expiringSoon ? 600 : 400
                          }}>
                            {driver.licenseExpiry}
                          </span>
                          {expired && <Badge variant="danger">Expired</Badge>}
                          {expiringSoon && <Badge variant="warning">Expiring Soon</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span style={{ 
                          fontWeight: 600,
                          color: driver.safetyScore >= 90 ? 'var(--color-success)' : driver.safetyScore >= 75 ? 'var(--color-warning)' : 'var(--color-danger)'
                        }}>
                          {driver.safetyScore} / 100
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <Button 
                          variant={driver.status === 'Suspended' ? 'primary' : 'danger'} 
                          size="sm"
                          leftIcon={driver.status === 'Suspended' ? <CheckCircle size={14} /> : <Ban size={14} />}
                          onClick={() => handleToggleSuspend(driver.id, driver.status)}
                        >
                          {driver.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
