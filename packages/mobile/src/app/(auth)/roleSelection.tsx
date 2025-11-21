import { View, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

const roleSelection = () => {
	return (
		<VStack space="xl" className="flex-1 items-center justify-center flex-col">
			<View className="flex flex-col items-center gap-5">
				<Heading className="font-bold text-primary-500 text-4xl mt-auto">
					What is your role?
				</Heading>
				<Text>Choose your role to get started</Text>
				<HStack space="xl">
					<VStack
						space="md"
						className="items-center max-w-[150px] border border-black"
					>
						<Image source={require("@/assets/images/brain.png")} size="xl" />
						<Text>Recoverer</Text>
						<Text className="text-center">
							Focus on your recovery with support
						</Text>
					</VStack>
					<VStack
						space="md"
						className="items-center max-w-[150px] border border-black"
					>
						<Image source={require("@/assets/images/heart.png")} size="xl" />
						<Text>Sponsor</Text>
						<Text className="text-center">
							Support someone you care about on their journey
						</Text>
					</VStack>
				</HStack>
			</View>
			<HStack space="xl">
				<Button>Recoverer</Button>
				<Button>Sponsor</Button>
			</HStack>
		</VStack>
	);
};

export default roleSelection;
