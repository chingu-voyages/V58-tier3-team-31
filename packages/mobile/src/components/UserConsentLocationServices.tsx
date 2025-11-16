import { View, Text } from "react-native";
import { Button } from "./ui/button";
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

	return (
		<View className="flex-1 justify-center items-center p-5 bg-white">
			<Text className="text-[22px] font-bold mb-8 text-pine-green">
				Enable Location Services
			</Text>
			<Text className="mb-6 text-center">
				To help you avoid high-risk areas, Safestep needs access to your
				location at all times. This allows us to alert you when you're near a
				zone you've marked as risky.
			</Text>
			{error && <Text className="text-red-500 mt-5">{error}</Text>}
			<View className="flex-col w-full justify-center space-y-3 mb-8 gap-1">
				<Button
					onPress={startTracking}
					disabled={isTracking}
					className="bg-pine-green rounded-full p-10"
				>
					<Text className="text-white font-bold">
						{isLoading ? "Starting..." : "Enable Location"}
					</Text>
				</Button>
				<Button
					onPress={stopTracking}
					disabled={!isTracking}
					className="bg-gray-200 rounded-full"
				>
					<Text className="font-bold">Skip for now</Text>
				</Button>
			</View>

			<Text className="text-[16px] font-semibold mb-5 p-2 rounded bg-gray-100">
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
				<Text className="mt-5 italic text-gray-500">
					No location data available.
				</Text>
			)}
		</View>
	);
};

export default UserConsentLocationServices;
