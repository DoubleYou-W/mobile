// context/HealthContext.tsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import BrokenHealthKit, { HealthKitPermissions } from "react-native-health";
import * as SecureStore from "expo-secure-store";

const NativeModules = require("react-native").NativeModules;
const AppleHealthKit = NativeModules.AppleHealthKit as typeof BrokenHealthKit;
AppleHealthKit.Constants = BrokenHealthKit.Constants;

type HealthContextType = {
  stepCount?: number;
  heartRate?: number;
};

const HealthContext = createContext<HealthContextType>({} as HealthContextType);

export const useHealth = () => {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error("useHealth must be used within <HealthProvider />");
  return ctx;
};

type HealthProviderProps = {
  children: React.ReactNode;
};

export const HealthProvider = ({ children }: HealthProviderProps) => {
  const [stepCount, setStepCount] = useState<number | undefined>();
  const [heartRate, setHeartRate] = useState<number | undefined>();

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const permissions: HealthKitPermissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.StepCount,
              AppleHealthKit.Constants.Permissions.HeartRate,
            ],
            write: [],
          },
        };

        AppleHealthKit.initHealthKit(permissions, async (err) => {
          if (err) {
            console.warn("HealthKit init error:", err);
            return;
          }

          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);

          const options: any = {
            startDate: yesterday.toISOString(),
            endDate: today.toISOString(),
          };

          const host = await SecureStore.getItemAsync('host');

          AppleHealthKit.getStepCount(options, (err, result) => {
            console.log(err);
            if (!err && result && result.value) {
              setStepCount(result.value);

              axios.post(`${host}/api/update`, {
                "source": "health",
                "timestamp": `${Date.now() / 1000}`,
                "content": `I have taken ${result.value} steps today so far (${
                  new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}.`
                });
            }
          });

          AppleHealthKit.getHeartRateSamples(options, async (err, results) => {
            if (!err && results && results.length > 0) {
              const latest = results[results.length - 1].value;
              setHeartRate(latest);

              axios.post(`${host}/api/update`, {
                "source": "health",
                "timestamp": `${Date.now() / 1000}`,
                "content": `My latest heart rate is ${latest} bpm at ${
                  new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}.`
                });
            }
          });
        });
      } catch(error) {
        console.error(error);
      }
    };

    SecureStore.getItemAsync("appleHealth").then(async (appleHealth) => {
      if (appleHealth !== "true") {
        console.debug("Apple Health is not enabled, skipping health data fetch.");
        return;
      }
      fetchHealthData();
    });
  }, []);

  const value = useMemo(() => ({ stepCount, heartRate }), [stepCount, heartRate]);

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};