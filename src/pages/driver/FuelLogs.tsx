import React, { useState } from 'react';
import { Fuel, Upload, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

const MOCK_FUEL_LOGS = [
  { id: 'FL-001', date: '2026-07-10', amount: 85.5, cost: 345.20, location: 'Pilot Travel Center, Dallas TX' },
  { id: 'FL-002', date: '2026-07-08', amount: 92.0, cost: 378.15, location: 'Love\'s, Austin TX' },
];

export function FuelLogs() {
  const [amount, setAmount] = useState('');
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock submission
    alert('Fuel log submitted successfully!');
    setAmount('');
    setCost('');
    setLocation('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Fuel Logs</h1>
        <p style={{ margin: 0 }}>Submit new fuel receipts and view past logs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Submit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Fuel Log</CardTitle>
            <CardDescription>Enter details from your latest fuel receipt</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Input 
                label="Fuel Amount (Gallons)" 
                type="number" 
                step="0.1"
                placeholder="0.0"
                leftIcon={<Fuel size={16} />}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
              <Input 
                label="Total Cost ($)" 
                type="number" 
                step="0.01"
                placeholder="0.00"
                leftIcon={<DollarSign size={16} />}
                value={cost}
                onChange={e => setCost(e.target.value)}
                required
              />
              <Input 
                label="Location / Gas Station" 
                placeholder="e.g., Pilot Travel Center, Phoenix AZ"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
              
              <div style={{ border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-4)', textAlign: 'center', backgroundColor: 'var(--color-surface)', marginTop: 'var(--space-2)', cursor: 'pointer' }}>
                <Upload size={24} style={{ margin: '0 auto var(--space-2) auto', color: 'var(--color-text-secondary)' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: '0 0 var(--space-1) 0' }}>Upload Receipt Photo</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>JPG, PNG up to 5MB</p>
              </div>

              <Button type="submit" style={{ marginTop: 'var(--space-2)' }}>Submit Log</Button>
            </form>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            <TableContainer style={{ border: 'none', borderRadius: 0 }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead style={{ textAlign: 'right' }}>Amount</TableHead>
                    <TableHead style={{ textAlign: 'right' }}>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_FUEL_LOGS.map(log => (
                    <TableRow key={log.id}>
                      <TableCell style={{ fontSize: '0.875rem' }}>{log.date}</TableCell>
                      <TableCell style={{ fontSize: '0.875rem' }}>{log.location}</TableCell>
                      <TableCell style={{ textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>{log.amount} gal</TableCell>
                      <TableCell style={{ textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>${log.cost.toFixed(2)}</TableCell>
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
