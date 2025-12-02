import * as TaskManager from "expo-task-manager";
import { GeofencingEventType } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Region } from "react-native-maps";

export const GEOFENCE_TASK = "geofence-task";
export interface GeofenceRecord {
	eventType: GeofencingEventType;
	region: Region;
	timestamp: Date;
}

TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
	if (error) {
		console.error("Geofencing task error:", error);
		return;
	}

	const { eventType, region } = data as {
		eventType: GeofencingEventType;
		region: {
			identifier: string;
			latitude: number;
			longitude: number;
			radius: number;
		};
	};

	const record = {
		eventType,
		region,
		timestamp: Date.now(),
	};

	const history = JSON.parse(
		(await AsyncStorage.getItem("GEOFENCE_EVENTS")) || "[]",
	);
	history.push(record);

	await AsyncStorage.setItem("GEOFENCE_EVENTS", JSON.stringify(history));

	if (eventType === GeofencingEventType.Enter) {
		console.log("🟢 Entered geofence region:", region);
	}

	if (eventType === GeofencingEventType.Exit) {
		console.log("🔴 Exited geofence region:", region.identifier);
	}

	return;
});
