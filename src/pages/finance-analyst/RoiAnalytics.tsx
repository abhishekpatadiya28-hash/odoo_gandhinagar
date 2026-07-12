import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useVehicleStore } from '../../store/useVehicleStore';

export function RoiAnalytics() {
  const vehicles = useVehicleStore(state => state.vehicles);

  // Compute mock ROI per vehicle based on status/capacity
  const getMockRoiDetails = (vehicleId: string, capacity: number, fuelEfficiency: number) => {
    // Generate some mock math to look realistic
    const grossRevenue = capacity * 0.15; // mock rate per payload capacity
    const estimatedMiles = 15000;
    const fuelCost = (estimatedMiles / fuelEfficiency) * 3.50; // $3.50 per gallon
    const maintenanceCost = capacity * 0.02;
    const netProfit = grossRevenue - fuelCost - maintenanceCost;
    const roiPercentage = ((netProfit / (grossRevenue || 1)) * 100).toFixed(1);

    return {
      grossRevenue: grossRevenue.toFixed(2),
      fuelCost: fuelCost.toFixed(2),
      netProfit: netProfit.toFixed(2),
      roiPercentage
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Vehicle ROI Analytics</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Evaluate profitability, revenue performance, and ROI per fleet vehicle.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Yield Analysis</CardTitle>
          <CardDescription>Estimated annual yields and profitability matrix per vehicle.</CardDescription>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <TableContainer style={{ border: 'none', borderRadius: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Plate</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Est. Revenue</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Est. Fuel Costs</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Est. Net Profit</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>ROI Yield</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => {
                  const roi = getMockRoiDetails(vehicle.id, vehicle.capacity, vehicle.fuelEfficiency);
                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell style={{ fontWeight: 500 }}>{vehicle.make} {vehicle.model}</TableCell>
                      <TableCell><Badge variant="default" style={{ fontFamily: 'monospace' }}>{vehicle.licensePlate}</Badge></TableCell>
                      <TableCell style={{ textAlign: 'right' }}>${parseFloat(roi.grossRevenue).toLocaleString()}</TableCell>
                      <TableCell style={{ textAlign: 'right', color: 'var(--color-danger)' }}>-${parseFloat(roi.fuelCost).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell style={{ textAlign: 'right', color: parseFloat(roi.netProfit) >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        ${parseFloat(roi.netProfit).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell style={{ textAlign: 'right', fontWeight: 600 }}>
                        <span style={{ color: parseFloat(roi.roiPercentage) >= 40 ? 'var(--color-success)' : 'inherit' }}>
                          {roi.roiPercentage}%
                        </span>
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
