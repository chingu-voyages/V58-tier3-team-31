import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FontAwesome } from "@expo/vector-icons";
import { View, Switch } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon, ChevronRightIcon } from "@/components/ui/icon";
import { useState } from "react";
import useLocationTracker from "@/hooks/useLocationTracker";

const recovererSettings = () => {
	const { startTracking, stopTracking, trackingState } = useLocationTracker();
	const [isEnabled, setIsEnabled] = useState(false);

	const toggleSwitch = () => {
		setIsEnabled((prev) => {
			const newState = !prev;

			if (newState) startTracking();
			else stopTracking();

			return newState;
		});
	};

	return (
		<VStack className="flex-1 bg-white p-10 justify-center" space="4xl">
			{trackingState.state === "tracking" && <Text>Tracking</Text>}
			<VStack space="md" className="justify-start">
				<Heading className="text-2xl text-primary-500">Account Details</Heading>
				<HStack className="items-center justify-between">
					<View className="flex flex-row items-center gap-3">
						<View className=" p-2 bg-[#FFEAE1]">
							<FontAwesome name="user" size={30} color="#2A5E69" />
						</View>
						<Text>View/Edit Profile</Text>
					</View>
					<Icon as={ChevronRightIcon} />
				</HStack>
			</VStack>

			<VStack space="md">
				<Heading className="text-2xl text-primary-500">
					Location Tracking
				</Heading>
				<HStack className="items-center justify-between">
					<View className="flex flex-row items-center gap-3">
						<View className="p-2 bg-[#FFEAE1]">
							<FontAwesome name="user" size={30} color="#2A5E69" />
						</View>
						<Text>Enable Location Tracking</Text>
					</View>
					<Switch value={isEnabled} onValueChange={toggleSwitch} />
				</HStack>
			</VStack>

			<VStack space="md">
				<Heading className="text-2xl text-primary-500">
					Notification Preferences
				</Heading>
				<HStack className="items-center justify-between">
					<View className="flex flex-row items-center gap-3">
						<View className="p-2 bg-[#FFEAE1]">
							<FontAwesome name="user" size={30} color="#2A5E69" />
						</View>
						<Text>Notification Settings</Text>
					</View>
					<Icon as={ChevronRightIcon} />
				</HStack>
			</VStack>

			<VStack space="md">
				<Heading className="text-2xl text-primary-500">Privacy</Heading>
				<HStack className="items-center justify-between">
					<View className="flex flex-row items-center gap-3">
						<View className="p-2 bg-[#FFEAE1]">
							<FontAwesome name="user" size={30} color="#2A5E69" />
						</View>
						<Text>Privacy Information</Text>
					</View>
					<Icon as={ChevronRightIcon} />
				</HStack>
			</VStack>
		</VStack>
	);
};

export default recovererSettings;
