import { create } from 'zustand';
import { apiFetch, fetchOptions } from '../api';

export type DriverStatus = 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  contactNumber: string;
  email: string;
  status: DriverStatus;
  safetyScore: number;
  hireDate: string;
}

interface DriverState {
  drivers: Driver[];
  fetchDrivers: () => Promise<void>;
  addDriver: (driver: Omit<Driver, 'id'>) => Promise<void>;
  updateDriver: (id: string, updates: Partial<Driver>) => Promise<void>;
  deleteDriver: (id: string) => Promise<void>;
  getAvailableDrivers: () => Driver[];
}

export const useDriverStore = create<DriverState>((set, get) => ({
  drivers: [],
  
  fetchDrivers: async () => {
    try {
      const data = await apiFetch('/drivers.php');
      const mapped = data.drivers.map((d: any) => ({
        id: d.id, name: d.name, licenseNumber: d.license_number,
        licenseExpiry: d.license_expiry, contactNumber: d.contact_number,
        email: d.email, status: d.status as DriverStatus,
        safetyScore: parseInt(d.safety_score), hireDate: d.hire_date
      }));
      set({ drivers: mapped });
    } catch (e) {
      console.error(e);
    }
  },
  
  addDriver: async (driverData) => {
    try {
      await apiFetch('/drivers.php', fetchOptions('POST', driverData));
      get().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  },
  
  updateDriver: async (id, updates) => {
    try {
      await apiFetch(`/drivers.php?id=${id}`, fetchOptions('PUT', updates));
      get().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  },
  
  deleteDriver: async (id) => {
    try {
      await apiFetch(`/drivers.php?id=${id}`, fetchOptions('DELETE'));
      get().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  },
  
  getAvailableDrivers: () => {
    return get().drivers.filter(d => d.status === 'Available');
  }
}));
