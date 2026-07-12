import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useVehicleStore } from '../../store/useVehicleStore';

export function Maintenance() {
  const vehicles = useVehicleStore(state => state.vehicles);
  
  const inShopVehicles = vehicles.filter(v => v.status === 'In Shop');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Maintenance Management</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Track service logs and manage vehicles currently in the shop.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicles Currently In Shop</CardTitle>
          <CardDescription>Vehicles that are undergoing maintenance and are unavailable for dispatch.</CardDescription>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <TableContainer style={{ border: 'none', borderRadius: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inShopVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell style={{ fontWeight: 500 }}>{vehicle.make} {vehicle.model}</TableCell>
                    <TableCell><Badge variant="default" style={{ fontFamily: 'monospace' }}>{vehicle.licensePlate}</Badge></TableCell>
                    <TableCell><Badge variant="warning">In Shop</Badge></TableCell>
                    <TableCell>{vehicle.lastMaintenanceDate}</TableCell>
                  </TableRow>
                ))}
                {inShopVehicles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)' }}>
                      No vehicles are currently in the shop.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
