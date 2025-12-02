import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import useLocationTracker from "@/hooks/useLocationTracker";
import useRecoverer from "@/hooks/useRecoverer";
import { useEffect } from "react";

const RecovererDashboard = () => {
	const { recoverer, isLoading } = useRecoverer();

	const { startTracking, stopTracking, trackingState } = useLocationTracker();

	useEffect(() => {
		startTracking();
	}, [startTracking]);

	return (
		<View>
			{recoverer && <Text>Welcome, {recoverer.firstName}</Text>}
			{trackingState.state === "stopped" && (
				<Button
					onPress={startTracking}
					variant="solid"
					size="xl"
					className="w-64 mt-5 mx-auto rounded-full"
				>
					<ButtonText className="font-bold text-center text-lg ">
						Enable Tracking
					</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
			)}

			{trackingState.state === "tracking" && (
				<Button
					onPress={stopTracking}
					variant="solid"
					size="xl"
					className="w-64 mt-5 mx-auto rounded-full"
				>
					<ButtonText className="font-bold text-center text-lg ">
						Stop Tracking
					</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
			)}
			<Text className="text-[16px] font-semibold my-5 rounded bg-gray-100 text-center">
				Status: {trackingState.state}
			</Text>
			<Text className="text-[16px] font-semibold mb-2 rounded bg-gray-100 text-center">
				{trackingState.state === "tracking"
					? "🟢 Tracking Active"
					: "🔴 Tracking Stopped"}
			</Text>

			{trackingState.state === "tracking" ? (
				<View className="mt-5 p-4 rounded-lg border border-green-700 bg-green-100 w-full">
					<Text className="font-bold mb-1 text-[16px]">
						Last Updated Coordinates:
					</Text>
					<Text>Latitude: **{trackingState.coords.latitude.toFixed(6)}**</Text>
					<Text>
						Longitude: **{trackingState.coords.longitude.toFixed(6)}**
					</Text>
					<Text>
						Timestamp: {new Date(trackingState.timeStamp).toLocaleString()}
					</Text>
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
