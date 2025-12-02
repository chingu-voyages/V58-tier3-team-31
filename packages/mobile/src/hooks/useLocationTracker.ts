import { useState, useRef } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import type { LocationSubscription } from "expo-location";

type IdleState = {
  state: "idle";
};

type LoadingState = {
  state: "loading";
};

type ErrorState = {
  state: "error";
  error: string;
};

type TrackingState = {
  state: "tracking";
  coords: Location.LocationObjectCoords;
  timeStamp: number;
};

type StoppedState = {
  state: "stopped";
};

export type LocationTrackerState =
  | IdleState
  | LoadingState
  | ErrorState
  | TrackingState
  | StoppedState;

const useLocationTracker = () => {
  const [trackingState, setTrackingState] = useState<LocationTrackerState>({
    state: "idle",
  });

  const subscriptionRef = useRef<LocationSubscription>(null);

  const startTracking = async () => {
    setTrackingState({ state: "loading" });

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      switch (status) {
        case "denied":
          setTrackingState({
            state: "error",
            error: "Permission to access location was denied",
          });
          Alert.alert(
            "Permission Required",
            "Location access is needed to start tracking",
          );
          return;

        case "granted": {
          const locationSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.BestForNavigation,
              timeInterval: 5000,
            },
            (newLocation) => {
              console.log({
                newLocation,
              });
              setTrackingState({
                state: "tracking",
                coords: newLocation.coords,
                timeStamp: newLocation.timestamp,
              });
            },
            (error) => {
              setTrackingState({
                state: "error",
                error: error,
              });
            },
          );

          subscriptionRef.current = locationSubscription;
          return;
        }

        default: {
          setTrackingState({
            state: "error",
            error: `Unhandled permission status: ${status}`,
          });
          return;
        }
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred while starting tracking.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setTrackingState({
        state: "error",
        error: errorMessage,
      });
    }
  };

  const stopTracking = async () => {
    if (subscriptionRef.current) {
      await subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
    setTrackingState({ state: "stopped" });
  };

  return {
    trackingState,
    startTracking,
    stopTracking,
  };
};

export default useLocationTracker;
