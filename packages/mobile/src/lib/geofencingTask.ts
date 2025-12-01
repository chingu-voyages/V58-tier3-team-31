import * as TaskManager from "expo-task-manager";
import { GeofencingEventType } from "expo-location";

export const GEOFENCE_TASK = "geofence-task";

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

	if (eventType === GeofencingEventType.Enter) {
		console.log("🟢 Entered geofence region:", region);
	}

	if (eventType === GeofencingEventType.Exit) {
		console.log("🔴 Exited geofence region:", region.identifier);
	}

	return;
});
