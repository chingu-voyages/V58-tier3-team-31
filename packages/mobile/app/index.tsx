import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import * as Location from "expo-location";

export default function Index() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		async function getCurrentLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		}

		getCurrentLocation();
	}, []);

	let text = "Waiting...";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>{text}</Text>
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
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
});
