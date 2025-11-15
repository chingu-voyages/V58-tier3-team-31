import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import * as Location from "expo-location";

export default function Index() {
	// const [location, setLocation] = useState<Location.LocationObject | null>(
	// 	null,
	// );
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [subscription, setSubscription] = useState(null);
	const [address, setAddress] =
		useState<Location.LocationGeocodedAddress | null>(null);

	console.log("address:", address);

	useEffect(() => {
		async function getCurrentLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync();
			console.log("status:", status);
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			// CRITICAL DEBUG STEP
			console.log("--- POSITION DATA ---");
			console.log("Latitude:", location.coords.latitude);
			console.log("Longitude:", location.coords.longitude);
			console.log("Accuracy:", location.coords.accuracy);
			console.log("--- END POSITION ---");
			const reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});

			console.log("reverseGeocode:", reverseGeocode);

			if (reverseGeocode.length > 0) {
				setAddress(reverseGeocode[0]);
			} else {
				setErrorMsg("No address found");
			}

			// setLocation(location);
		}

		getCurrentLocation();
	}, []);

	// let text = "Waiting...";
	// if (errorMsg) {
	// 	text = errorMsg;
	// } else if (location) {
	// 	text = JSON.stringify(location);
	// }

	return (
		<View style={styles.container}>
			{/* <Text style={styles.paragraph}>{text}</Text> */}

			{errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

			{address && (
				<View style={styles.addressContainer}>
					<Text style={styles.addressText}>
						{address.name || ""}
						{"\n"}
						{address.street || ""}
						{"\n"}
						{address.city || ""}, {address.region || ""}{" "}
						{address.postalCode || ""}
						{"\n"}
						{address.country || ""}
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	error: {
		color: "red",
		marginTop: 20,
	},
	addressContainer: {
		marginTop: 20,
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 10,
		width: "100%",
	},
	addressText: {
		fontSize: 16,
		lineHeight: 24,
	},
});
