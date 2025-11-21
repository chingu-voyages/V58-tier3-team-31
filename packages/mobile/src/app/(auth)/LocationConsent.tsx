import { View, Text } from "react-native";
import { Button } from "@/components/ui/button";
import useLocationTracker from "@/hooks/useLocationTracker";

const LocationConsent = () => {
	const {
		isTracking,
		isLoading,
		error,
		currentCoords,
		startTracking,
		stopTracking,
	} = useLocationTracker();

	return (
		<View className="flex-1 justify-evenly items-center p-5 bg-white">
			<View className="items-center">
				<Text className="text-[22px] font-bold mb-6 text-primary-500">
					Enable Location Services
				</Text>
				<Text className="mb-6 text-center">
					To help you avoid high-risk areas, Safestep needs access to your
					location at all times. This allows us to alert you when you're near a
					zone you've marked as risky.
				</Text>
			</View>

			<View className="flex-col w-full justify-center space-y-3 mb-8 gap-2">
				{error && <Text className="text-red-500 mt-5">{error}</Text>}
				<Button
					onPress={startTracking}
					disabled={isTracking}
					variant="solid"
					className="rounded-full h-13 w-full py-4"
				>
					<Text className="font-bold text-center text-white text-lg">
						{isLoading ? "Starting..." : "Enable Location"}
					</Text>
				</Button>

				<Button
					onPress={stopTracking}
					disabled={!isTracking}
					className="bg-gray-200 rounded-full h-13 w-full py-4"
				>
					<Text className="font-bold text-center text-black text-lg">
						Skip for now
					</Text>
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
		</View>
	);
};

export default LocationConsent;
