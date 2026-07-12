import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useVehicleStore } from './store/useVehicleStore';
import { useDriverStore } from './store/useDriverStore';
import { useTripStore } from './store/useTripStore';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Landing Pages
import { Home } from './pages/landing/Home';
import { Login } from './pages/landing/Login';
import { Features } from './pages/landing/Features';
import { Solutions } from './pages/landing/Solutions';
import { About } from './pages/landing/About';
import { Contact } from './pages/landing/Contact';

// Fleet Manager Pages (Existing)
import { ManagerDashboard } from './pages/fleet-manager/Dashboard';
import { Vehicles } from './pages/fleet-manager/Vehicles';
import { Drivers } from './pages/fleet-manager/Drivers';
import { Trips } from './pages/fleet-manager/Trips';

// Driver Pages (Existing)
import { DriverDashboard } from './pages/driver/Dashboard';
import { FuelLogs } from './pages/driver/FuelLogs';

// Fleet Manager Missing Pages
import { Maintenance } from './pages/fleet-manager/Maintenance';
import { Expenses } from './pages/fleet-manager/Expenses';
import { Reports } from './pages/fleet-manager/Reports';

const Notifications = () => <div className="page-content"><h1>Notifications</h1></div>;
const Profile = () => <div className="page-content"><h1>User Profile</h1></div>;
const Settings = () => <div className="page-content"><h1>Settings</h1></div>;

// Driver Missing Pages
import { DriverTrips } from './pages/driver/Trips';

// Safety Officer Pages
import { SafetyDashboard } from './pages/safety-officer/SafetyDashboard';
import { SafetyDrivers } from './pages/safety-officer/SafetyDrivers';
import { Compliance } from './pages/safety-officer/Compliance';
import { SafetyReports } from './pages/safety-officer/SafetyReports';

// Financial Analyst Pages
import { FinanceDashboard } from './pages/finance-analyst/FinanceDashboard';
import { RoiAnalytics } from './pages/finance-analyst/RoiAnalytics';
import { CostTracking } from './pages/finance-analyst/CostTracking';


// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role as string)) {
    let fallback = '/';
    switch (user.role) {
      case 'fleet_manager': fallback = '/manager'; break;
      case 'driver': fallback = '/driver'; break;
      case 'safety_officer': fallback = '/safety'; break;
      case 'financial_analyst': fallback = '/finance'; break;
    }
    return <Navigate to={fallback} replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { fetchVehicles } = useVehicleStore();
  const { fetchDrivers } = useDriverStore();
  const { fetchTrips } = useTripStore();
  
  // Load data on start
  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
    fetchTrips();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes with Shared Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          
          {/* Fleet Manager Routes */}
          <Route path="/manager" element={<ProtectedRoute allowedRoles={['fleet_manager']}><ManagerDashboard /></ProtectedRoute>} />
          <Route path="/manager/vehicles" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Vehicles /></ProtectedRoute>} />
          <Route path="/manager/drivers" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Drivers /></ProtectedRoute>} />
          <Route path="/manager/trips" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Trips /></ProtectedRoute>} />
          <Route path="/manager/maintenance" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Maintenance /></ProtectedRoute>} />
          <Route path="/manager/fuel" element={<ProtectedRoute allowedRoles={['fleet_manager']}><FuelLogs /></ProtectedRoute>} />
          <Route path="/manager/expenses" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Expenses /></ProtectedRoute>} />
          <Route path="/manager/reports" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Reports /></ProtectedRoute>} />
          <Route path="/manager/notifications" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Notifications /></ProtectedRoute>} />
          <Route path="/manager/profile" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Profile /></ProtectedRoute>} />
          <Route path="/manager/settings" element={<ProtectedRoute allowedRoles={['fleet_manager']}><Settings /></ProtectedRoute>} />
          
          {/* Driver Routes */}
          <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
          <Route path="/driver/trips" element={<ProtectedRoute allowedRoles={['driver']}><DriverTrips /></ProtectedRoute>} />
          <Route path="/driver/fuel" element={<ProtectedRoute allowedRoles={['driver']}><FuelLogs /></ProtectedRoute>} />
          <Route path="/driver/notifications" element={<ProtectedRoute allowedRoles={['driver']}><Notifications /></ProtectedRoute>} />
          <Route path="/driver/profile" element={<ProtectedRoute allowedRoles={['driver']}><Profile /></ProtectedRoute>} />
          <Route path="/driver/settings" element={<ProtectedRoute allowedRoles={['driver']}><Settings /></ProtectedRoute>} />
          
          {/* Safety Officer Routes */}
          <Route path="/safety" element={<ProtectedRoute allowedRoles={['safety_officer']}><SafetyDashboard /></ProtectedRoute>} />
          <Route path="/safety/drivers" element={<ProtectedRoute allowedRoles={['safety_officer']}><SafetyDrivers /></ProtectedRoute>} />
          <Route path="/safety/compliance" element={<ProtectedRoute allowedRoles={['safety_officer']}><Compliance /></ProtectedRoute>} />
          <Route path="/safety/reports" element={<ProtectedRoute allowedRoles={['safety_officer']}><SafetyReports /></ProtectedRoute>} />
          <Route path="/safety/notifications" element={<ProtectedRoute allowedRoles={['safety_officer']}><Notifications /></ProtectedRoute>} />
          <Route path="/safety/profile" element={<ProtectedRoute allowedRoles={['safety_officer']}><Profile /></ProtectedRoute>} />
          <Route path="/safety/settings" element={<ProtectedRoute allowedRoles={['safety_officer']}><Settings /></ProtectedRoute>} />
          
          {/* Financial Analyst Routes */}
          <Route path="/finance" element={<ProtectedRoute allowedRoles={['financial_analyst']}><FinanceDashboard /></ProtectedRoute>} />
          <Route path="/finance/roi" element={<ProtectedRoute allowedRoles={['financial_analyst']}><RoiAnalytics /></ProtectedRoute>} />
          <Route path="/finance/costs" element={<ProtectedRoute allowedRoles={['financial_analyst']}><CostTracking /></ProtectedRoute>} />
          <Route path="/finance/reports" element={<ProtectedRoute allowedRoles={['financial_analyst']}><Reports /></ProtectedRoute>} />
          <Route path="/finance/notifications" element={<ProtectedRoute allowedRoles={['financial_analyst']}><Notifications /></ProtectedRoute>} />
          <Route path="/finance/profile" element={<ProtectedRoute allowedRoles={['financial_analyst']}><Profile /></ProtectedRoute>} />
          <Route path="/finance/settings" element={<ProtectedRoute allowedRoles={['financial_analyst']}><Settings /></ProtectedRoute>} />
          
        </Route>
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
