import { View, Text, StyleSheet, Button } from "react-native";
import useLocationTracker from "../hooks/useLocationTracker";

const UserConsentLocationServices = () => {
	const {
		isTracking,
		isLoading,
		error,
		currentCoords,
		startTracking,
		stopTracking,
	} = useLocationTracker();

	console.log("current coords:", currentCoords);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Enable Location Services</Text>
			<Text>
				To help you avoid high-risk areas, Safestep needs access to your
				location at all times. This allows us to alert you when you're near a
				zone you've marked as risky.
			</Text>
			{error && <Text style={styles.error}>{error}</Text>}
			<View style={styles.buttonContainer}>
				<Button
					title={isLoading ? "Starting..." : "Enable Location"}
					onPress={startTracking}
					disabled={isTracking}
				></Button>
				<Button
					title="Stop Tracking"
					onPress={stopTracking}
					disabled={!isTracking}
				></Button>
				<Button title="Skip for Now"></Button>
			</View>

			<Text style={styles.statusText}>
				Status: {isTracking ? "🟢 Tracking Active" : "🔴 Tracking Stopped"}
			</Text>

			{currentCoords ? (
				<View style={styles.locationBox}>
					<Text style={styles.label}>Last Updated Coordinates:</Text>
					<Text>Latitude: **{currentCoords.latitude.toFixed(6)}**</Text>
					<Text>Longitude: **{currentCoords.longitude.toFixed(6)}**</Text>
				</View>
			) : (
				<Text style={styles.infoText}>No location data available.</Text>
			)}
		</View>
	);
};

// Forest Green	#228B22	Classic, rich, natural dark green.
// Hunter Green	#355E3B	A very deep, sophisticated, almost black-green.
// Pine Green	#01796F	A dark cyan-green, slightly cooler than forest green.
// Dark Olive Green	#556B2F	An earthy, muted dark green with a yellow undertone.
// Deep Emerald	#046307	A very dark, vibrant green often used for high contrast.
// A Custom Safe Green	#1A4314	A darker shade that works well for primary buttons against a light background.

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 30,
		color: "#01796F",
	},
	buttonContainer: {
		flexDirection: "column",
		marginBottom: 30,
		width: "100%",
		justifyContent: "center",
		gap: "10",
	},
	button: {
		borderBlockColor: "#01796F",
	},
	statusText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 20,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#f0f0f0",
	},
	locationBox: {
		marginTop: 20,
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#28a745",
		backgroundColor: "#e9f7e9",
		alignItems: "flex-start",
	},
	label: {
		fontWeight: "bold",
		marginBottom: 5,
		fontSize: 16,
	},
	infoText: {
		marginTop: 20,
		fontStyle: "italic",
		color: "#666",
	},
	error: {
		color: "red",
		marginTop: 20,
	},
});

export default UserConsentLocationServices;
