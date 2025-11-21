import { View, Text } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import useLocationTracker from "@/hooks/useLocationTracker";
import useSession from "@/hooks/useSession";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { enableForegroundPermission } from "@/lib/location";

const LocationConsent = () => {
	const router = useRouter();
	const { session } = useSession();

	const { isTracking, isLoading, error, startTracking } = useLocationTracker();

	const handleEnableForegroundPermission = async () => {
		if (!session?.user) return Alert.alert("User not found");

		try {
			await startTracking();

			if (!error && isTracking) {
				const data = await enableForegroundPermission(session?.user?.id);

				console.log("enable foreground permissions data:", data);

				if (data) router.replace("./recoverer");
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
					onPress={handleEnableForegroundPermission}
					disabled={isTracking}
					variant="solid"
					className="rounded-full h-13 w-full py-4"
				>
					<ButtonText className="font-bold text-center text-white text-lg">
						Enable Location
					</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
				<Button
					onPress={() => router.replace("./recoverer")}
					className="bg-gray-200 rounded-full h-13 w-full py-4"
				>
					<ButtonText className="font-bold text-center text-black text-lg">
						Skip for now
					</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
			</View>
		</View>
	);
};

export default LocationConsent;
