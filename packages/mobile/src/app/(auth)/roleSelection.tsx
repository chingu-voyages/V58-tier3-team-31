import { View, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

const roleSelection = () => {
	return (
		<View className="flex-1 items-center justify-center flex-col gap-20">
			<View className="flex flex-col items-center gap-5">
				<Heading className="font-bold text-primary-500 text-4xl mt-auto">
					What is your role?
				</Heading>
				<Text>Choose your role to get started</Text>
				<View className="flex flex-row gap-5">
					<View className="flex flex-col gap-3 items-center">
						<Image source={require("@/assets/images/brain.png")} size="xl" />
						<Text>Recoverer</Text>
						<Text>Focus on your recovery with support</Text>
					</View>
					<View className="flex flex-col gap-3 items-center">
						<Image source={require("@/assets/images/heart.png")} size="xl" />
						<Text>Sponsor</Text>
						<Text>Support someone you care about on their journey</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-row gap-3">
				<Button>Recoverer</Button>
				<Button>Sponsor</Button>
			</View>

			<View></View>
		</View>
	);
};

export default roleSelection;
