import { View, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import useSession from "@/hooks/useSession";
import { Alert } from "react-native";
import { useState } from "react";
import { signUpRecoverer, signUpSponsor } from "@/lib/auth";
import { useRouter } from "expo-router";

const roleSelection = () => {
	const router = useRouter();
	const { session } = useSession();
	const [isLoading, setIsLoading] = useState(false);

	console.log("session user:", session?.user);

	const handleSignUpSponsor = async () => {
		setIsLoading(true);

		if (!session?.user) {
			setIsLoading(false);
			return Alert.alert("User not found");
		}

		try {
			const sponsorData = await signUpSponsor(session?.user.id);

			console.log("sponsor data:", sponsorData);

			if (sponsorData?.id) router.replace("/sponsor");
		} catch (err) {
			console.error("There was a problem signing up the sponsor:", err);
			if (err instanceof Error) Alert.alert(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignUpRecoverer = async () => {
		setIsLoading(true);

		if (!session?.user) {
			setIsLoading(false);
			return Alert.alert("User not found");
		}

		try {
			const recovererData = await signUpRecoverer(session?.user.id);
			console.log("recoverer data:", recovererData);
			if (recovererData?.id) router.replace("/(auth)/locationConsent");
		} catch (err) {
			console.error("There was a problem signing up the recoverer:", err);
			if (err instanceof Error) Alert.alert(err.message);
		} finally {
			setIsLoading(false);
		}
	};

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
						<Image
							alt="recoverer-image"
							source={require("@/assets/images/brain.png")}
							size="xl"
						/>
						<Text>Recoverer</Text>
						<Text className="text-center">
							Focus on your recovery with support
						</Text>
					</VStack>
					<VStack
						space="md"
						className="items-center max-w-[150px] border border-black"
					>
						<Image
							alt="sponsor-image"
							source={require("@/assets/images/heart.png")}
							size="xl"
						/>
						<Text>Sponsor</Text>
						<Text className="text-center">
							Support someone you care about on their journey
						</Text>
					</VStack>
				</HStack>
			</View>
			<HStack space="xl">
				<Button onPress={handleSignUpRecoverer}>
					<ButtonText>Recoverer</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
				<Button onPress={handleSignUpSponsor}>
					<ButtonText>Sponsor</ButtonText>
					{isLoading && <ButtonSpinner color="white" />}
				</Button>
			</HStack>
		</VStack>
	);
};

export default roleSelection;
