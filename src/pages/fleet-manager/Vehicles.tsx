import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { useVehicleStore, type Vehicle, type VehicleStatus } from '../../store/useVehicleStore';
import { useDriverStore } from '../../store/useDriverStore';
import { useTripStore } from '../../store/useTripStore';

export function Vehicles() {
  const { vehicles, addVehicle, deleteVehicle } = useVehicleStore();
  const drivers = useDriverStore(state => state.drivers);
  const trips = useTripStore(state => state.trips);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Vehicle Form State
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vin, setVin] = useState('');
  const [capacity, setCapacity] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  
  const filteredVehicles = vehicles.filter(v => 
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: VehicleStatus) => {
    switch(status) {
      case 'Available': return <Badge variant="success">Available</Badge>;
      case 'On Trip': return <Badge variant="primary">On Trip</Badge>;
      case 'In Shop': return <Badge variant="warning">In Shop</Badge>;
      case 'Retired': return <Badge variant="danger">Retired</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };
  
  const getAssignedDriver = (vehicleId: string) => {
    // Find active trip for this vehicle
    const activeTrip = trips.find(t => t.vehicleId === vehicleId && (t.status === 'Dispatched' || t.status === 'In Progress'));
    if (activeTrip) {
      const driver = drivers.find(d => d.id === activeTrip.driverId);
      return driver ? driver.name : 'Unknown';
    }
    return 'Unassigned';
  };

  const handleAddVehicle = () => {
    addVehicle({
      make,
      model,
      year: parseInt(year) || new Date().getFullYear(),
      licensePlate,
      vin,
      status: 'Available',
      capacity: parseInt(capacity) || 0,
      fuelEfficiency: parseFloat(fuelEfficiency) || 0,
      lastMaintenanceDate: new Date().toISOString().split('T')[0]
    });
    setIsAddModalOpen(false);
    // Reset form
    setMake(''); setModel(''); setYear(''); setLicensePlate(''); setVin(''); setCapacity(''); setFuelEfficiency('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-1)' }}>Vehicle Registry</h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Manage your fleet, view status, and tracking.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>Add Vehicle</Button>
      </div>

      <Card>
        <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <CardTitle>All Vehicles</CardTitle>
            <CardDescription>{vehicles.length} total vehicles registered</CardDescription>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ width: '250px' }}>
              <Input 
                placeholder="Search vehicles..." 
                leftIcon={<Search size={16} />}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" leftIcon={<Filter size={18} />}>Filter</Button>
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <TableContainer style={{ border: 'none', borderRadius: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Driver</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell style={{ fontWeight: 600 }}>{vehicle.vin.substring(0, 8)}...</TableCell>
                    <TableCell>{vehicle.year} {vehicle.make} {vehicle.model}</TableCell>
                    <TableCell>
                      <Badge variant="default" style={{ fontFamily: 'monospace' }}>{vehicle.licensePlate}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell style={{ color: getAssignedDriver(vehicle.id) === 'Unassigned' ? 'var(--color-text-tertiary)' : 'inherit' }}>
                      {getAssignedDriver(vehicle.id)}
                    </TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                        <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteVehicle(vehicle.id)}><Trash size={16} className="text-danger" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredVehicles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)' }}>
                      No vehicles found matching "{searchTerm}"
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
        title="Add New Vehicle"
        description="Register a new vehicle into the fleet management system."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddVehicle}>Register Vehicle</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <Input label="Make" placeholder="e.g. Freightliner" value={make} onChange={(e) => setMake(e.target.value)} />
          <Input label="Model" placeholder="e.g. Cascadia" value={model} onChange={(e) => setModel(e.target.value)} />
          <Input label="Year" type="number" placeholder="2024" value={year} onChange={(e) => setYear(e.target.value)} />
          <Input label="License Plate" placeholder="XYZ-1234" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
          <Input label="VIN" placeholder="1FUJAAAAX..." value={vin} onChange={(e) => setVin(e.target.value)} />
          <Select label="Fuel Type" options={[{label: 'Diesel', value: 'diesel'}, {label: 'Electric', value: 'ev'}, {label: 'Gasoline', value: 'gas'}]} />
          <Input label="Capacity (lbs)" type="number" placeholder="45000" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <Input label="Fuel Efficiency (MPG)" type="number" placeholder="7.2" value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}
