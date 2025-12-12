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

  const HARDCODED_LATITUDE = 41.48595203395239;
  const HARDCODED_LONGITUDE = -71.42164970467098;

  // Mock the LocationObjectCoords type expected by LocationMap
  const mockCurrentLocationCoords = {
    latitude: HARDCODED_LATITUDE,
    longitude: HARDCODED_LONGITUDE,
    // Add other properties that the LocationObjectCoords type requires,
    // even if they are zero or null, to satisfy the type definition.
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  };

  useEffect(() => {
    startTracking();
    startGeofencing();
  }, [startTracking, startGeofencing]);

  if (trackingState.state !== "tracking") return <Text>Is loading...</Text>;

  return (
    trackingState.state === "tracking" &&
    isFocused && (
      <LocationMap
        currentLocationCoords={mockCurrentLocationCoords}
        geofencingState={geofencingState}
      />
    )
  );
};

export default CurrentLocationMap;
