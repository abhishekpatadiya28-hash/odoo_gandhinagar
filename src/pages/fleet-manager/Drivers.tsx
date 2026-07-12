import React, { useState } from 'react';
import { Plus, Search, Filter, ShieldAlert, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useDriverStore, type DriverStatus } from '../../store/useDriverStore';

export function Drivers() {
  const { drivers, addDriver, deleteDriver } = useDriverStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Driver Form State
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: DriverStatus) => {
    switch(status) {
      case 'Available': return <Badge variant="success">Available</Badge>;
      case 'On Trip': return <Badge variant="primary">On Trip</Badge>;
      case 'Off Duty': return <Badge variant="default">Off Duty</Badge>;
      case 'Suspended': return <Badge variant="danger">Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getSafetyBadge = (score: number) => {
    if (score >= 90) return <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{score} / 100</span>;
    if (score >= 75) return <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>{score} / 100</span>;
    return <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{score} / 100 <ShieldAlert size={14} style={{ display: 'inline', marginLeft: 4 }} /></span>;
  };

  const handleAddDriver = () => {
    addDriver({
      name,
      licenseNumber,
      licenseExpiry,
      contactNumber,
      email,
      status: 'Available',
      safetyScore: 100, // New drivers start with a perfect score
      hireDate: new Date().toISOString().split('T')[0]
    });
    setIsAddModalOpen(false);
    setName(''); setLicenseNumber(''); setLicenseExpiry(''); setContactNumber(''); setEmail('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-1)' }}>Driver Management</h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Manage your workforce, safety scores, and compliance.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>Add Driver</Button>
      </div>

      <Card>
        <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <CardTitle>All Drivers</CardTitle>
            <CardDescription>{drivers.length} total drivers</CardDescription>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ width: '250px' }}>
              <Input 
                placeholder="Search drivers..." 
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
                  <TableHead>Driver ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Safety Score</TableHead>
                  <TableHead>License Expiry</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map(driver => (
                  <TableRow key={driver.id}>
                    <TableCell style={{ fontWeight: 600 }}>{driver.id}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <img src={`https://ui-avatars.com/api/?name=${driver.name}&background=random`} alt={driver.name} style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{driver.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{driver.licenseNumber}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{driver.contactNumber}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{driver.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell>{getSafetyBadge(driver.safetyScore)}</TableCell>
                    <TableCell>
                      <span style={{ 
                        color: new Date(driver.licenseExpiry) < new Date(Date.now() + 30*24*60*60*1000) ? 'var(--color-danger)' : 'inherit',
                        fontWeight: new Date(driver.licenseExpiry) < new Date(Date.now() + 30*24*60*60*1000) ? 600 : 400
                      }}>
                        {driver.licenseExpiry}
                      </span>
                    </TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                        <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteDriver(driver.id)}><Trash size={16} className="text-danger" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredDrivers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)' }}>
                      No drivers found matching "{searchTerm}"
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
        title="Onboard New Driver"
        description="Add a new driver to the system. They will default to Available status."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDriver}>Add Driver</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <Input label="Full Name" placeholder="e.g. Michael Smith" value={name} onChange={(e) => setName(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="License Number" placeholder="DL-123456" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
            <Input label="License Expiry" type="date" value={licenseExpiry} onChange={(e) => setLicenseExpiry(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="Contact Number" placeholder="(555) 123-4567" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            <Input label="Email Address" type="email" placeholder="michael@transitops.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
