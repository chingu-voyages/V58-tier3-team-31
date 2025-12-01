import * as Location from "expo-location";
import { useState } from "react";
import { Alert } from "react-native";
import { GEOFENCE_TASK, GeofenceRecord } from "@/lib/geofencingTask";

type Region = {
	identifier: string;
	latitude: number;
	longitude: number;
	radius: number;
	notifyOnEnter: true;
	notifyOnExit: true;
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

	const startGeofencing = async () => {
		setGeofencingState({ state: "loading" });

		try {
			const { status } = await Location.requestBackgroundPermissionsAsync();

			switch (status) {
				case "denied": {
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

				case "granted": {
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

					setGeofencingState({
						state: "active",
						regions,
						timeStamp: Date.now(),
					});

					return;
				}

				default: {
					return;
				}
			}
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
	};

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
