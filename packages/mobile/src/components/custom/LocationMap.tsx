import { useRef, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type * as Location from "expo-location";
import { View } from "react-native";

type LocationMapProps = {
  currentLocationCoords: Location.LocationObjectCoords;
};

const LocationMap = ({ currentLocationCoords }: LocationMapProps) => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [isAnimating] = useState(false);

  const { width, height } = Dimensions.get("window");

  console.log("map ref:", mapRef);
  console.log("region:", region);
  console.log("current location coords:", currentLocationCoords);

  useEffect(() => {
    if (currentLocationCoords && !isAnimating) {
      console.log("tracking use effect check");

      const { latitude, longitude } = currentLocationCoords;

      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
    }
  }, [currentLocationCoords, isAnimating]);

  return (
    <View className="border border-black flex-1 flex flex-col justify-center items-center">
      {region && (
        <MapView
          ref={mapRef}
          region={region}
          style={{ height: height, width: width, borderRadius: 12 }}
        >
          {currentLocationCoords && (
            <Marker coordinate={currentLocationCoords} />
          )}
          <TouchableOpacity
            className="absolute bottom-5 right-5"
            onPress={() => {
              if (currentLocationCoords && region) {
                mapRef.current?.animateToRegion(region);
              }
            }}
          >
            <MaterialIcons name="my-location" size={32} color="green" />
          </TouchableOpacity>
        </MapView>
      )}
    </View>
  );
};

export default LocationMap;
