import { useRef, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, type Region, Circle } from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type * as Location from "expo-location";
import { View } from "react-native";
import type { GeofencingState } from "@/hooks/useGeofencing";

type LocationMapProps = {
	currentLocationCoords: Location.LocationObjectCoords;
	geofencingState: GeofencingState;
};

const LocationMap = ({
	currentLocationCoords,
	geofencingState,
}: LocationMapProps) => {
	const mapRef = useRef<MapView>(null);
	const [region, setRegion] = useState<Region | null>(null);
	const [isAnimating] = useState(false);

	console.log("location map geofencing state:", geofencingState);

	const { width, height } = Dimensions.get("window");

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
					{/* <TouchableOpacity
						className="absolute bottom-5 right-5"
						onPress={() => {
							if (currentLocationCoords && region) {
								mapRef.current?.animateToRegion(region);
							}
						}}
					>
						<MaterialIcons name="my-location" size={32} color="green" />
					</TouchableOpacity> */}
				</MapView>
			)}
		</View>
	);
};

export default LocationMap;
