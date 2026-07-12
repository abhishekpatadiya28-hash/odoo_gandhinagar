import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Truck, LayoutDashboard, Users, Map, Wrench, 
  Fuel, DollarSign, BarChart3, Bell, Settings, 
  LogOut, Menu, Search, ShieldAlert, FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore, type Role } from '../../store/useAuthStore';
import styles from './DashboardLayout.module.css';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const roleNavigation: Record<NonNullable<Role>, NavItem[]> = {
  fleet_manager: [
    { name: 'Dashboard', path: '/manager', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/manager/vehicles', icon: Truck },
    { name: 'Drivers', path: '/manager/drivers', icon: Users },
    { name: 'Trips', path: '/manager/trips', icon: Map },
    { name: 'Maintenance', path: '/manager/maintenance', icon: Wrench },
    { name: 'Fuel Logs', path: '/manager/fuel', icon: Fuel },
    { name: 'Expenses', path: '/manager/expenses', icon: DollarSign },
    { name: 'Reports', path: '/manager/reports', icon: BarChart3 },
  ],
  driver: [
    { name: 'Dashboard', path: '/driver', icon: LayoutDashboard },
    { name: 'Assigned Trips', path: '/driver/trips', icon: Map },
    { name: 'Fuel Logs', path: '/driver/fuel', icon: Fuel },
  ],
  safety_officer: [
    { name: 'Dashboard', path: '/safety', icon: LayoutDashboard },
    { name: 'Drivers & Licenses', path: '/safety/drivers', icon: Users },
    { name: 'Compliance', path: '/safety/compliance', icon: ShieldAlert },
    { name: 'Reports', path: '/safety/reports', icon: FileText },
  ],
  financial_analyst: [
    { name: 'Dashboard', path: '/finance', icon: LayoutDashboard },
    { name: 'ROI Analytics', path: '/finance/roi', icon: BarChart3 },
    { name: 'Cost Tracking', path: '/finance/costs', icon: DollarSign },
  ]
};

export function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If no user is found, theoretically they should be redirected, but App.tsx will handle protected routes.
  if (!user) return null;

  const navItems = roleNavigation[user.role as NonNullable<Role>] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, sidebarOpen && styles.open)}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Truck className="text-primary" size={24} />
            <span>TransitOps</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/${user.role?.split('_')[0]}`} // Match exact for root dashboard
              className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button className={styles.navItem} style={{ width: '100%', border: 'none', background: 'transparent' }} onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.iconButton} onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'none' /* handled via CSS media queries normally */ }}>
              <Menu size={20} />
            </button>
          </div>
          
          <div className={styles.topbarRight}>
            <div className={styles.userProfile}>
              <img src={user.avatar} alt="Profile" className={styles.avatar} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>{user.role?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className={styles.contentArea}>
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
