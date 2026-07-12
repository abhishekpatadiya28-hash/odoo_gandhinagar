import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useDriverStore } from '../../store/useDriverStore';

export function SafetyReports() {
  const drivers = useDriverStore(state => state.drivers);

  // Calculate average safety score
  const avgSafetyScore = drivers.length > 0
    ? (drivers.reduce((acc, curr) => acc + curr.safetyScore, 0) / drivers.length).toFixed(1)
    : '0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Safety Reports</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Detailed metrics, driver behavior rankings, and incident logs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Fleet Safety Index</CardTitle>
            <CardDescription>Overall safety score rating across all drivers.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              border: '8px solid var(--color-success)', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 'var(--space-4)'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{avgSafetyScore}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Out of 100</span>
            </div>
            <Badge variant="success">Excellent Standing</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver Rankings</CardTitle>
            <CardDescription>Safety leaderboard ranking from highest to lowest.</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            <TableContainer style={{ border: 'none', borderRadius: 0 }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Safety Score</TableHead>
                    <TableHead>Hire Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...drivers]
                    .sort((a, b) => b.safetyScore - a.safetyScore)
                    .map((driver, index) => (
                      <TableRow key={driver.id}>
                        <TableCell style={{ fontWeight: 600 }}>#{index + 1}</TableCell>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>
                          <span style={{ 
                            fontWeight: 600,
                            color: driver.safetyScore >= 90 ? 'var(--color-success)' : driver.safetyScore >= 75 ? 'var(--color-warning)' : 'var(--color-danger)'
                          }}>
                            {driver.safetyScore}
                          </span>
                        </TableCell>
                        <TableCell>{driver.hireDate}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
