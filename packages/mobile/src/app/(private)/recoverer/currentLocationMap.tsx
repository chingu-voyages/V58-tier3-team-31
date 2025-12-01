import useLocationTracker from "@/hooks/useLocationTracker";
import useGeofencing from "@/hooks/useGeofencing";
import LocationMap from "@/components/custom/LocationMap";
import { useEffect } from "react";
import { Text } from "react-native-svg";

const CurrentLocationMap = () => {
	const { trackingState, startTracking } = useLocationTracker();
	const { startGeofencing, stopGeofencing, geofencingState } = useGeofencing();

	useEffect(() => {
		startTracking();
	}, [startTracking]);

	if (trackingState.state !== "tracking") return <Text>Is loading...</Text>;

	return (
		trackingState.state === "tracking" && (
			<LocationMap currentLocationCoords={trackingState.coords} />
		)
	);
};

export default CurrentLocationMap;
