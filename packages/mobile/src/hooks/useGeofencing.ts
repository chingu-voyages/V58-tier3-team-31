import * as Location from "expo-location";
import { useState } from "react";
import { Alert } from "react-native";
import { GEOFENCE_TASK, type GeofenceRecord } from "@/lib/geofencingTask";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

type Region = {
	identifier: string;
	latitude: number;
	longitude: number;
	radius: number;
	notifyOnEnter: boolean;
	notifyOnExit: boolean;
};

type IdleState = {
	state: "idle";
	regions: Region[];
	history: GeofenceRecord[];
};

type LoadingState = {
	state: "loading";
};

type ErrorState = {
	state: "error";
	error: string;
};

type ActiveState = {
	state: "active";
	regions: Region[];
	history: GeofenceRecord[];
};

type StoppedState = {
	state: "stopped";
};

export type GeofencingState =
	| IdleState
	| LoadingState
	| ErrorState
	| ActiveState
	| StoppedState;

const useGeofencing = () => {
	const [geofencingState, setGeofencingState] = useState<GeofencingState>({
		state: "idle",
		regions: [],
		history: [],
	});

	useEffect(() => {
		if (geofencingState.state !== "active") return;

		const id = setInterval(async () => {
			const json = await AsyncStorage.getItem("GEOFENCE_EVENTS");
			const events = json ? JSON.parse(json) : [];
			setGeofencingState((prev) =>
				prev.state === "active" ? { ...prev, history: events } : prev,
			);
		}, 3000);

		return () => clearInterval(id);
	}, [geofencingState.state]);

	const startGeofencing = useCallback(async () => {
		setGeofencingState({ state: "loading" });

		try {
			const { status } = await Location.requestBackgroundPermissionsAsync();

			if (status === "denied") {
				setGeofencingState({
					state: "error",
					error: "Permisison to use background location was denied",
				});
				Alert.alert(
					"Permission Required",
					"Permission is required for background tracking",
				);

				return;
			}

			const regions: Region[] = [
				{
					identifier: "PT-Home-Test",
					latitude: 41.48595203395239,
					longitude: -71.42164970467098,
					radius: 150,
					notifyOnEnter: true,
					notifyOnExit: true,
				},
			];

			await Location.startGeofencingAsync(GEOFENCE_TASK, regions);

			const json = await AsyncStorage.getItem("GEOFENCE_EVENTS");
			const events = json ? JSON.parse(json) : [];

			setGeofencingState({
				state: "active",
				regions,
				history: events,
			});

			return;
		} catch (error) {
			let errorMessage = "An unknown error occurred while starting geofencing.";
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			setGeofencingState({
				state: "error",
				error: errorMessage,
			});
		}
	}, []);

	const stopGeofencing = async () => {
		try {
			await Location.stopGeofencingAsync(GEOFENCE_TASK);
		} catch (error) {
			let errorMessage = "An unknown error occurred while stopping geofencing.";
			if (error instanceof Error) {
				errorMessage = error.message;
			}

			setGeofencingState({
				state: "error",
				error: errorMessage,
			});
		}
	};

	return {
		geofencingState,
		startGeofencing,
		stopGeofencing,
	};
};

export default useGeofencing;
