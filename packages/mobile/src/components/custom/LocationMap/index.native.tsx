import { useRef } from "react";
import { Dimensions } from "react-native";
import MapView, { type Region, Circle } from "react-native-maps";
import LocationMarker from "../LocationMarker";
import { useMemo } from "react";
import { View } from "react-native";
import type { GeofencingState } from "@/hooks/useGeofencing";

type LocationMapProps = {
  // currentLocationCoords: Location.LocationObjectCoords;
  geofencingState: GeofencingState;
};

const LocationMap = ({ geofencingState }: LocationMapProps) => {
  const mapRef = useRef<MapView>(null);

  const { width, height } = Dimensions.get("window");

  const HARDCODED_LATITUDE = 41.48595203395239;
  const HARDCODED_LONGITUDE = -71.42164970467098;

  const initialRegion = useMemo<Region>(
    () => ({
      latitude: HARDCODED_LATITUDE,
      longitude: HARDCODED_LONGITUDE,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
    [],
  );

  return (
    <View className="border border-black flex-1 flex flex-col justify-center items-center">
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        style={{ height: height, width: width, borderRadius: 12 }}
      >
        <LocationMarker />

        {geofencingState.state === "active" && geofencingState.regions[0] && (
          <Circle
            center={{
              latitude: geofencingState.regions[0]?.latitude,
              longitude: geofencingState.regions[0]?.longitude,
            }}
            radius={geofencingState.regions[0]?.radius}
            strokeColor="rgba(0, 150, 0, 0.8)"
            fillColor="rgba(0, 150, 0, 0.2)"
          />
        )}
      </MapView>
    </View>
  );
};

export default LocationMap;
