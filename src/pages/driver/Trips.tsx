import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useTripStore, type TripStatus } from '../../store/useTripStore';
import { useVehicleStore } from '../../store/useVehicleStore';

export function DriverTrips() {
  const trips = useTripStore(state => state.trips);
  const vehicles = useVehicleStore(state => state.vehicles);
  
  // Mock logged in driver
  const currentDriverId = 'd2';
  
  const [searchTerm, setSearchTerm] = useState('');

  const myTrips = trips.filter(t => t.driverId === currentDriverId);
  
  const filteredTrips = myTrips.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: TripStatus) => {
    switch(status) {
      case 'In Progress': return <Badge variant="primary">In Progress</Badge>;
      case 'Dispatched': return <Badge variant="primary">Dispatched</Badge>;
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'Draft': return <Badge variant="warning">Upcoming</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getVehicleName = (vId: string) => {
    const v = vehicles.find(v => v.id === vId);
    return v ? `${v.make} ${v.model} (${v.licensePlate})` : 'Unknown Vehicle';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Trip History</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>View your past and upcoming assigned trips.</p>
      </div>

      <Card>
        <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <CardTitle>All My Trips</CardTitle>
          </div>
          <div style={{ width: '250px' }}>
            <Input 
              placeholder="Search trips..." 
              leftIcon={<Search size={16} />}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <TableContainer style={{ border: 'none', borderRadius: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map(trip => (
                  <TableRow key={trip.id}>
                    <TableCell style={{ fontWeight: 600 }}>{trip.id}</TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                          {trip.origin}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          <MapPin size={10} color="var(--color-danger)" />
                          {trip.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ fontSize: '0.875rem' }}>{getVehicleName(trip.vehicleId)}</TableCell>
                    <TableCell style={{ fontSize: '0.875rem' }}>
                      {trip.completedAt ? new Date(trip.completedAt).toLocaleDateString() : new Date(trip.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTrips.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)' }}>
                      No trips found.
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
