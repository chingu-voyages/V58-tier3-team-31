import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon, ChevronRightIcon } from "@/components/ui/icon";

const recovererSettings = () => {
	return (
		<VStack className="flex-1 bg-white p-10" space="3xl">
			<VStack space="md">
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
					<Icon as={ChevronRightIcon} />
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
