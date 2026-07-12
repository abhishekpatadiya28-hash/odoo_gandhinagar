import { create } from 'zustand';
import { apiFetch, fetchOptions } from '../api';

export type VehicleStatus = 'Available' | 'On Trip' | 'In Shop' | 'Retired';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: VehicleStatus;
  capacity: number;
  fuelEfficiency: number;
  lastMaintenanceDate: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  getAvailableVehicles: () => Vehicle[];
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  
  fetchVehicles: async () => {
    try {
      const data = await apiFetch('/vehicles.php');
      // Convert snake_case from DB to camelCase if needed, but our API returns raw DB currently
      // Actually let's assume the API returns the DB columns. We need to map them back.
      const mapped = data.vehicles.map((v: any) => ({
        id: v.id, make: v.make, model: v.model, year: parseInt(v.year),
        licensePlate: v.license_plate, vin: v.vin, status: v.status as VehicleStatus,
        capacity: parseInt(v.capacity), fuelEfficiency: parseFloat(v.fuel_efficiency),
        lastMaintenanceDate: v.last_maintenance_date
      }));
      set({ vehicles: mapped });
    } catch (e) {
      console.error(e);
    }
  },
  
  addVehicle: async (vehicleData) => {
    try {
      await apiFetch('/vehicles.php', fetchOptions('POST', vehicleData));
      get().fetchVehicles();
    } catch (e) {
      console.error(e);
    }
  },
  
  updateVehicle: async (id, updates) => {
    try {
      await apiFetch(`/vehicles.php?id=${id}`, fetchOptions('PUT', updates));
      get().fetchVehicles();
    } catch (e) {
      console.error(e);
    }
  },
  
  deleteVehicle: async (id) => {
    try {
      await apiFetch(`/vehicles.php?id=${id}`, fetchOptions('DELETE'));
      get().fetchVehicles();
    } catch (e) {
      console.error(e);
    }
  },
  
  getAvailableVehicles: () => {
    return get().vehicles.filter(v => v.status === 'Available');
  }
}));
