import { useRef, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import useLocationTracker from "@/hooks/useLocationTracker";

const LocationMap = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region | null>(null);

  const { width, height } = Dimensions.get("window");

  const { trackingState, startTracking } = useLocationTracker();

  useEffect(() => {
    startTracking();
  }, [startTracking]);

  console.log("map ref:", mapRef);
  console.log("region:", region);

  useEffect(() => {
    if (trackingState.state === "tracking") {
      const { latitude, longitude } = trackingState.coords;
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
    }
  }, [trackingState]);

  return (
    <View className="border border-black flex-1 flex flex-col justify-center items-center">
      {region && (
        <MapView
          ref={mapRef}
          region={region}
          style={{ height: height, width: width, borderRadius: 12 }}
        >
          {region.latitude && <Marker coordinate={region} />}
        </MapView>
      )}
      <TouchableOpacity
        className="absolute bottom-5 right-5"
        onPress={() => {
          if (region) {
            mapRef.current?.animateToRegion(region);
          }
        }}
      >
        <MaterialIcons name="my-location" size={32} color="orange" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationMap;
