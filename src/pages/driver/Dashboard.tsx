import React from 'react';
import { Map, Navigation, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useTripStore } from '../../store/useTripStore';
import { useVehicleStore } from '../../store/useVehicleStore';
import { useDriverStore } from '../../store/useDriverStore';

export function DriverDashboard() {
  const { trips, completeTrip } = useTripStore();
  const vehicles = useVehicleStore(state => state.vehicles);
  
  // For the sake of demonstration, let's hardcode this driver to 'd2' (Sarah Connor)
  // In a real application, we would get the logged-in user's ID from useAuthStore.
  const currentDriverId = 'd2'; 
  
  const myTrips = trips.filter(t => t.driverId === currentDriverId);
  const activeTrip = myTrips.find(t => t.status === 'In Progress' || t.status === 'Dispatched');
  const upcomingTrips = myTrips.filter(t => t.status === 'Draft');

  const getVehicleName = (vId: string) => {
    const v = vehicles.find(v => v.id === vId);
    return v ? `${v.make} ${v.model} (${v.licensePlate})` : 'Unknown Vehicle';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>My Assignments</h1>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>View your current trips and update their status.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Active Trip */}
        <Card style={activeTrip ? { border: '2px solid var(--color-primary)' } : {}}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <CardTitle>Current Trip: {activeTrip ? activeTrip.id : 'None'}</CardTitle>
                {activeTrip && <CardDescription>{activeTrip.origin} to {activeTrip.destination}</CardDescription>}
              </div>
              {activeTrip && <Badge variant="primary">{activeTrip.status}</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {activeTrip ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                    <div style={{ width: 2, height: 40, backgroundColor: 'var(--color-border)' }}></div>
                    <Map size={16} color="var(--color-danger)" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>{activeTrip.origin}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>Dispatched: {activeTrip.dispatchedAt ? new Date(activeTrip.dispatchedAt).toLocaleTimeString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>{activeTrip.destination}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>Est Duration: {activeTrip.estimatedDuration}</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '0.875rem', margin: '0 0 var(--space-2) 0' }}><strong>Vehicle:</strong> {getVehicleName(activeTrip.vehicleId)}</p>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}><strong>Cargo:</strong> {activeTrip.cargoWeight.toLocaleString()} lbs</p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <Button style={{ flex: 1 }} leftIcon={<CheckCircle2 size={18} />} onClick={() => completeTrip(activeTrip.id)}>Complete Trip</Button>
                  <Button variant="secondary" leftIcon={<Clock size={18} />}>Report Delay</Button>
                </div>
              </div>
            ) : (
              <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-success)', opacity: 0.5 }} />
                <p>You have no active trips at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Draft Trips</CardTitle>
            <CardDescription>Your schedule for upcoming trips</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {upcomingTrips.map(trip => (
                <div key={trip.id} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600 }}>{trip.id}</span>
                    <Badge variant="warning">{trip.status}</Badge>
                  </div>
                  <p style={{ fontSize: '0.875rem', margin: '0 0 var(--space-1) 0' }}>{trip.origin} to {trip.destination}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>Scheduled: {new Date(trip.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              
              {upcomingTrips.length === 0 && (
                <div style={{ padding: 'var(--space-4)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  No other trips scheduled
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
