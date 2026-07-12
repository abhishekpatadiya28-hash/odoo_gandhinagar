import React from 'react';
import { Truck, Activity, Wrench, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { useVehicleStore } from '../../store/useVehicleStore';
import { useDriverStore } from '../../store/useDriverStore';
import { useTripStore } from '../../store/useTripStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from 'recharts';

export function ManagerDashboard() {
  const vehicles = useVehicleStore(state => state.vehicles);
  const drivers = useDriverStore(state => state.drivers);
  const trips = useTripStore(state => state.trips);

  const totalVehicles = vehicles.length;
  const inMaintenance = vehicles.filter(v => v.status === 'In Shop').length;
  const driversOnDuty = drivers.filter(d => d.status === 'Available' || d.status === 'On Trip').length;
  const activeTrips = trips.filter(t => t.status === 'In Progress' || t.status === 'Dispatched').length;

  // Compute fleet status data for chart
  const vehicleStatusData = [
    { name: 'Available', value: vehicles.filter(v => v.status === 'Available').length, color: 'var(--color-success)' },
    { name: 'On Trip', value: vehicles.filter(v => v.status === 'On Trip').length, color: 'var(--color-primary)' },
    { name: 'In Shop', value: vehicles.filter(v => v.status === 'In Shop').length, color: 'var(--color-danger)' },
    { name: 'Retired', value: vehicles.filter(v => v.status === 'Retired').length, color: 'var(--color-text-tertiary)' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1>Fleet Overview</h1>
          <p style={{ margin: 0 }}>Monitor your vehicles, drivers, and operations in real-time.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
              <Truck size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Total Vehicles</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{totalVehicles}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)' }}>
              <Activity size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Active Trips</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{activeTrips}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', borderRadius: 'var(--radius-md)' }}>
              <Navigation size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>Drivers on Duty</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{driversOnDuty}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
              <Wrench size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 500 }}>In Maintenance</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{inMaintenance}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status Distribution</CardTitle>
            <CardDescription>Current state of the entire fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px', width: '100%', marginTop: 'var(--space-4)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {vehicleStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>Latest dispatched trips</CardDescription>
          </CardHeader>
          <CardContent>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
               {trips.slice(0, 4).map(trip => (
                 <div key={trip.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                   <div>
                     <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text-main)' }}>{trip.origin} → {trip.destination}</p>
                     <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Status: {trip.status}</p>
                   </div>
                   <div style={{ fontSize: '0.875rem', fontWeight: 500, color: trip.status === 'Completed' ? 'var(--color-success)' : trip.status === 'In Progress' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                     {trip.status}
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
