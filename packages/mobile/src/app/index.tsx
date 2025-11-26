import { FormControl } from "@/components/ui/form-control";
import { useState } from "react";
import { Alert } from "react-native";
import { signUpWithEmail } from "@/lib/auth";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);

	const handleSignUpWithEmail = async () => {
		setIsLoading(true);
		if (!email || !password) {
			Alert.alert("Please enter your email and passsword to sign up");
			setIsLoading(false);
			return;
		}
		try {
			const session = await signUpWithEmail(email, password);

			if (session?.user) router.replace("/(auth)/roleSelection");
		} catch (err) {
			console.error("Unexpected error occurred signing up:", err);

			if (err instanceof Error) {
				Alert.alert(err?.message);
				setError(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeEmail = (text: string) => {
		setEmail(text);
		setError(false);
	};

	const onChangePassword = (text: string) => {
		setPassword(text);
		setError(false);
	};

	return (
		<SafeAreaView className="bg-white">
			<FormControl className="mt-[80px] px-8">
				<VStack space="lg">
					<VStack>
						<Heading className="text-center text-[25px] py-[4px] font-bold text-[#2b5f69]">
							Login
						</Heading>
						<Text className="text-[16px] mt-[24px] mb-[16px] font-light">
							Login to your SafeStep account
						</Text>

						<VStack space="xs">
							<Input variant="outline">
								<InputField
									value={email}
									onChangeText={(text) => onChangeEmail(text)}
									autoCapitalize={"none"}
									placeholder="Email"
								/>
							</Input>
						</VStack>

						<VStack space="xs">
							<Input variant="outline" className="my-[15px]">
								<InputField
									value={password}
									onChangeText={(text) => onChangePassword(text)}
									type={showPassword ? "text" : "password"}
									secureTextEntry={!showPassword}
									placeholder="Password"
									className="p-[12px]"
								/>
								<InputSlot
									className="pr-3"
									onPress={() => setShowPassword(!showPassword)}
								>
									<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
								</InputSlot>
							</Input>
						</VStack>

						<Link href="/" className="text-[#2b5f69]">
							I forgot my Password
						</Link>
					</VStack>

					<VStack className="mt-[250px] mb-16">
						<Button
							variant="outline"
							onPress={handleSignUpWithEmail}
							disabled={isLoading || error}
							className="rounded-[100px] bg-[#2b5f69] border border-[#2b5f69]"
						>
							<ButtonText className="text-white text-center text-[15px]">
								Login
							</ButtonText>
							{isLoading && <ButtonSpinner color={"grey"} />}
						</Button>
						<Link
							href="/"
							className="text-center gap-3 py-[12px] border-[0.2px] rounded-[100px] my-[16px]"
						>
							<FontAwesome name="google" size={20} />
							<Text className="font-bold text-[15px]">Sign in with Google</Text>
						</Link>
						<Link
							href="/"
							className="text-center gap-3 py-[12px] border-[0.2px] rounded-[100px] "
						>
							<FontAwesome name="apple" size={20} />
							<Text className="font-bold text-[15px]">Sign in with Google</Text>
						</Link>
					</VStack>
				</VStack>
			</FormControl>
		</SafeAreaView>
	);
}
