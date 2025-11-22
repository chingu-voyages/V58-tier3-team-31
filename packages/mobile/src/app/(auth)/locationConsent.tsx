import { View, Text } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { enableForegroundPermission } from "@/lib/location";

const LocationConsent = () => {
	const router = useRouter();
	const { session } = useSession();
	const [isLoading, setIsLoading] = useState(false);

	const handleForegroundPermission = async () => {
		const currentUser = session?.user;
		if (!currentUser) return Alert.alert("User not found");
		setIsLoading(true);

		try {
			const data = await enableForegroundPermission(session?.user?.id);

			if (data) router.replace("/recoverer");
		} catch (err) {
			console.error(
				"There was a problem enabling foreground permissions:",
				err,
			);
			if (err instanceof Error) return Alert.alert(err.message);
		} finally {
			setIsLoading(false);
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
				<Button
					onPress={handleForegroundPermission}
					disabled={isLoading}
					variant="solid"
					className="rounded-full h-13 w-full py-4"
				>
					<ButtonText className="font-bold text-center text-white text-lg">
						Enable Location
					</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
				<Button
					onPress={() => router.replace("/recoverer")}
					className="bg-gray-200 rounded-full h-13 w-full py-4"
				>
					<ButtonText className="font-bold text-center text-black text-lg">
						Skip for now
					</ButtonText>
				</Button>
			</View>
		</View>
	);
};

export default LocationConsent;
