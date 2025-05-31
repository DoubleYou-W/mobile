import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { LOCATION_TASK_NAME } from './locationTask';

type LocationContextType = {
  location?: Location.LocationObject;
};

const LocationContext = createContext<LocationContextType>({} as LocationContextType);

export const useLocation = (): LocationContextType => {
  const value = useContext(LocationContext);
  if (!value) {
    throw new Error("useLocation must be wrapped in a <LocationProvider />");
  }
  return value;
};

type LocationProviderProps = {
  children: React.ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    const startBackgroundLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const bgStatus = await Location.requestBackgroundPermissionsAsync();
      if (bgStatus.status !== 'granted') return;

      const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (!hasStarted) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 1200000,
          distanceInterval: 1000,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "App is using your location",
            notificationBody: "To provide nearby matches",
          },
        });
      }
    };

    SecureStore.getItemAsync("location").then(async (location) => {
      if (location !== "true") {
        console.debug("Apple Location is not enabled, skipping location data fetch.");
        return;
      }

      startBackgroundLocation();
    });

  }, []);

  const value = useMemo(() => ({ location }), [location]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};