import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import type { LocationCoords } from "@/types/geolocation";
import type { LocationSubscription } from "expo-location";
import { useCallback } from "react";

const useLocationTracker = (hasPermission?: boolean) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isTracking, setIsTracking] = useState(false);
	const [currentCoords, setCurrentCoords] = useState<LocationCoords>(null);
	const subscriptionRef = useRef<LocationSubscription>(null);
	const [hasForegroundPermission, setHasForegroundPermission] =
		useState(hasPermission);

	const startTracking = useCallback(async () => {
		if (isTracking || isLoading) return;
		setIsLoading(true);
		setError(null);

		try {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				setError("Permission to access location was denied");
				Alert.alert(
					"Permission Required",
					"Location access is needed to start tracking",
				);
				return;
			}

			if (isTracking) return;

			const subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.BestForNavigation,
					timeInterval: 5000,
					distanceInterval: 10,
				},
				(newLocation) => {
					setCurrentCoords(newLocation.coords);
					console.log("New Location:", newLocation);
				},
			);

			subscriptionRef.current = subscription;
			setIsTracking(true);
			Alert.alert("Tracking started", "Location is now being monitored");
			return true;
		} catch (err) {
			console.error("Error starting tracking:", err);

			if (err instanceof Error) {
				setError(
					err?.message || "An unknown error occured while starting tracking",
				);
			}
			Alert.alert("Error", "Failed to start tracking");
			setIsTracking(false);
		} finally {
			setIsLoading(false);
		}
	}, [isTracking, isLoading]);

	const stopTracking = useCallback(async () => {
		if (subscriptionRef.current) {
			subscriptionRef.current.remove();
			subscriptionRef.current = null;
			setIsTracking(false);
			setCurrentCoords(null);
			setIsLoading(false);
			setError(null);
			return Alert.alert(
				"Tracking stopped",
				"Location monitoring has been paused",
			);
		}
	}, []);

	useEffect(() => {
		setHasForegroundPermission(hasPermission);
	}, [hasPermission]);

	useEffect(() => {
		if (hasForegroundPermission) startTracking();
		else if (!hasForegroundPermission) stopTracking();
	}, [hasForegroundPermission, startTracking, stopTracking]);

	useEffect(() => {
		return () => {
			if (subscriptionRef.current) {
				subscriptionRef.current.remove();
				console.log("Tracking subscription was removed on unmount.");
			}
		};
	}, []);

	return {
		isTracking,
		isLoading,
		error,
		currentCoords,
		startTracking,
		stopTracking,
		hasForegroundPermission,
	};
};

export default useLocationTracker;
