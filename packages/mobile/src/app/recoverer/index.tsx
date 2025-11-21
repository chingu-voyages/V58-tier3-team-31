import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View, Alert } from "react-native";
import useLocationTracker from "@/hooks/useLocationTracker";
import useSession from "@/hooks/useSession";
import { disableForegroundPermission } from "@/lib/location";

const RecovererDashboard = () => {
	const { session } = useSession();
	const { isTracking, isLoading, error, currentCoords, stopTracking } =
		useLocationTracker();

	const handleDisableForegroundPermission = async () => {
		if (!session?.user) return Alert.alert("User not found");

		try {
			stopTracking();

			if (!error && !isTracking) {
				const data = await disableForegroundPermission(session?.user?.id);
				console.log("disable foreground permissions data:", data);
			}
		} catch (err) {
			console.error(
				"There was a problem enabling foreground permissions:",
				err,
			);
			if (err instanceof Error) return Alert.alert(err.message);
		}
	};

	return (
		<View>
			<Button
				onPress={handleDisableForegroundPermission}
				className="bg-gray-200 rounded-full h-13 w-full py-4"
			>
				<ButtonText className="font-bold text-center text-black text-lg">
					Stop Tracking
				</ButtonText>
				{isLoading && <ButtonSpinner color="white" />}
			</Button>

			<Text className="text-[16px] font-semibold mb-5 p-2 rounded bg-gray-100 text-center">
				Status: {isTracking ? "🟢 Tracking Active" : "🔴 Tracking Stopped"}
			</Text>

			{currentCoords ? (
				<View className="mt-5 p-4 rounded-lg border border-green-700 bg-green-100 w-full">
					<Text className="font-bold mb-1 text-[16px]">
						Last Updated Coordinates:
					</Text>
					<Text>Latitude: **{currentCoords.latitude.toFixed(6)}**</Text>
					<Text>Longitude: **{currentCoords.longitude.toFixed(6)}**</Text>
				</View>
			) : (
				<Text className="mt-5 italic text-gray-500 text-center">
					No location data available.
				</Text>
			)}
		</View>
	);
};

export default RecovererDashboard;
