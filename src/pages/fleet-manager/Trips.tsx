import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { useTripStore, type TripStatus } from '../../store/useTripStore';
import { useVehicleStore } from '../../store/useVehicleStore';
import { useDriverStore } from '../../store/useDriverStore';

export function Trips() {
  const { trips, addTrip, dispatchTrip, completeTrip, cancelTrip } = useTripStore();
  const { getAvailableVehicles, vehicles } = useVehicleStore();
  const { getAvailableDrivers, drivers } = useDriverStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Trip Form
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');

  const filteredTrips = trips.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: TripStatus) => {
    switch(status) {
      case 'In Progress': return <Badge variant="primary">In Progress</Badge>;
      case 'Dispatched': return <Badge variant="primary">Dispatched</Badge>;
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'Draft': return <Badge variant="warning">Draft</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getVehicleName = (vId: string) => {
    const v = vehicles.find(v => v.id === vId);
    return v ? `${v.make} ${v.model}` : 'Unknown Vehicle';
  };

  const getDriverName = (dId: string) => {
    const d = drivers.find(d => d.id === dId);
    return d ? d.name : 'Unknown Driver';
  };

  const handleCreateTrip = () => {
    addTrip({
      vehicleId,
      driverId,
      origin,
      destination,
      distance: parseInt(distance) || 0,
      estimatedDuration,
      cargoWeight: parseInt(cargoWeight) || 0
    });
    setIsAddModalOpen(false);
    // Reset
    setVehicleId(''); setDriverId(''); setOrigin(''); setDestination(''); setDistance(''); setEstimatedDuration(''); setCargoWeight('');
  };

  const availableVehicleOptions = getAvailableVehicles().map(v => ({ label: `${v.make} ${v.model} (${v.licensePlate})`, value: v.id }));
  const availableDriverOptions = getAvailableDrivers().map(d => ({ label: d.name, value: d.id }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-1)' }}>Trip Management</h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Dispatch trips, track progress, and view histories.</p>
        </div>
        <Button leftIcon={<Navigation size={18} />} onClick={() => setIsAddModalOpen(true)}>Create Trip</Button>
      </div>

      <Card>
        <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <CardTitle>All Trips</CardTitle>
            <CardDescription>Recent and active trips across the fleet</CardDescription>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ width: '300px' }}>
              <Input 
                placeholder="Search trips, locations..." 
                leftIcon={<Search size={16} />}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
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
                  <TableHead>Vehicle & Driver</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
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
                    <TableCell>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 500 }}>{getVehicleName(trip.vehicleId)}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{getDriverName(trip.driverId)}</span>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                        {trip.status === 'Draft' && (
                          <Button variant="outline" size="sm" onClick={() => dispatchTrip(trip.id)}>Dispatch</Button>
                        )}
                        {(trip.status === 'Dispatched' || trip.status === 'In Progress') && (
                          <Button variant="outline" size="sm" onClick={() => completeTrip(trip.id)}>Complete</Button>
                        )}
                        {(trip.status !== 'Completed' && trip.status !== 'Cancelled') && (
                          <Button variant="ghost" size="sm" onClick={() => cancelTrip(trip.id)}>Cancel</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTrips.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)' }}>
                      No trips found matching "{searchTerm}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Create New Trip"
        description="Draft a new trip and assign available resources."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTrip}>Save Draft</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Select 
              label="Select Vehicle" 
              options={[{ label: 'Select a vehicle...', value: '' }, ...availableVehicleOptions]} 
              value={vehicleId} 
              onChange={e => setVehicleId(e.target.value)} 
            />
            <Select 
              label="Select Driver" 
              options={[{ label: 'Select a driver...', value: '' }, ...availableDriverOptions]} 
              value={driverId} 
              onChange={e => setDriverId(e.target.value)} 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="Origin" placeholder="e.g. Los Angeles, CA" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            <Input label="Destination" placeholder="e.g. Phoenix, AZ" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="Distance (miles)" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
            <Input label="Est. Duration" placeholder="e.g. 5h 30m" value={estimatedDuration} onChange={(e) => setEstimatedDuration(e.target.value)} />
            <Input label="Cargo Wgt (lbs)" type="number" value={cargoWeight} onChange={(e) => setCargoWeight(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
