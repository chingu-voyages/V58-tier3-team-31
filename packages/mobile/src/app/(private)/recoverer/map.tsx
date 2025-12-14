import useLocationTracker from "@/hooks/useLocationTracker";
import useGeofencing from "@/hooks/useGeofencing";
import LocationMap from "@/components/custom/LocationMap";
import { useEffect } from "react";
import { Text } from "react-native-svg";
import { useIsFocused } from "@react-navigation/native";

const CurrentLocationMap = () => {
  const { trackingState, startTracking } = useLocationTracker();
  const { startGeofencing, geofencingState } = useGeofencing();
  const isFocused = useIsFocused();

  console.log("current location map geofencing state:", geofencingState);

  useEffect(() => {
    startTracking();
    startGeofencing();
  }, [startTracking, startGeofencing]);

  if (trackingState.state !== "tracking") return <Text>Is loading...</Text>;

  return (
    trackingState.state === "tracking" &&
    isFocused && <LocationMap geofencingState={geofencingState} />
  );
};

export default CurrentLocationMap;
