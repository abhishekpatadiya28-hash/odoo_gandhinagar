import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useVehicleStore } from '../../store/useVehicleStore';

export function CostTracking() {
  const vehicles = useVehicleStore(state => state.vehicles);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Cost & Operations Ledger</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Track driver payroll allocations, maintenance bills, and fuel fees.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Fleet Operation Breakdown</CardTitle>
            <CardDescription>Major expenditure items tracked across active assets.</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            <TableContainer style={{ border: 'none', borderRadius: 0 }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead style={{ textAlign: 'right' }}>Total Expense</TableHead>
                    <TableHead style={{ textAlign: 'right' }}>Allocation %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: 500 }}>Fuel Purchases</TableCell>
                    <TableCell style={{ textAlign: 'right', color: 'var(--color-danger)' }}>-$142,500.00</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>58.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 500 }}>Vehicle Maintenance</TableCell>
                    <TableCell style={{ textAlign: 'right', color: 'var(--color-danger)' }}>-$48,300.00</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>19.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 500 }}>Driver Salaries</TableCell>
                    <TableCell style={{ textAlign: 'right', color: 'var(--color-danger)' }}>-$54,000.00</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>22.1%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
