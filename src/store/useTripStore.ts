import { create } from 'zustand';
import { apiFetch, fetchOptions } from '../api';
import { useVehicleStore } from './useVehicleStore';
import { useDriverStore } from './useDriverStore';

export type TripStatus = 'Draft' | 'Dispatched' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedDuration: string;
  status: TripStatus;
  cargoWeight: number;
  createdAt: string;
  dispatchedAt?: string;
  completedAt?: string;
}

interface TripState {
  trips: Trip[];
  fetchTrips: () => Promise<void>;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateTripStatus: (id: string, status: TripStatus) => Promise<void>;
  dispatchTrip: (id: string) => Promise<void>;
  completeTrip: (id: string) => Promise<void>;
  cancelTrip: (id: string) => Promise<void>;
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  
  fetchTrips: async () => {
    try {
      const data = await apiFetch('/trips.php');
      const mapped = data.trips.map((t: any) => ({
        id: t.id, vehicleId: t.vehicle_id, driverId: t.driver_id,
        origin: t.origin, destination: t.destination, distance: parseFloat(t.distance),
        estimatedDuration: t.estimated_duration, status: t.status as TripStatus,
        cargoWeight: parseInt(t.cargo_weight), createdAt: t.created_at,
        dispatchedAt: t.dispatched_at, completedAt: t.completed_at
      }));
      set({ trips: mapped });
    } catch (e) {
      console.error(e);
    }
  },
  
  addTrip: async (tripData) => {
    try {
      await apiFetch('/trips.php', fetchOptions('POST', tripData));
      get().fetchTrips();
    } catch (e) {
      console.error(e);
    }
  },
  
  updateTripStatus: async (id, status) => {
    try {
      // For simplicity, we just use the dispatch/complete endpoints
      get().fetchTrips();
    } catch (e) {
      console.error(e);
    }
  },
  
  dispatchTrip: async (id) => {
    try {
      await apiFetch(`/trips.php?id=${id}&action=dispatch`, fetchOptions('PUT'));
      get().fetchTrips();
      // Update vehicle/driver stores since their status changed
      useVehicleStore.getState().fetchVehicles();
      useDriverStore.getState().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  },
  
  completeTrip: async (id) => {
    try {
      await apiFetch(`/trips.php?id=${id}&action=complete`, fetchOptions('PUT'));
      get().fetchTrips();
      useVehicleStore.getState().fetchVehicles();
      useDriverStore.getState().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  },
  
  cancelTrip: async (id) => {
    try {
      await apiFetch(`/trips.php?id=${id}&action=cancel`, fetchOptions('PUT'));
      get().fetchTrips();
      useVehicleStore.getState().fetchVehicles();
      useDriverStore.getState().fetchDrivers();
    } catch (e) {
      console.error(e);
    }
  }
}));
