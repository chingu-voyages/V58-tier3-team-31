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
import { useRouter } from "expo-router";

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

			if (session?.user) router.push("/(auth)/roleSelection");
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
		<FormControl className="p-4 border border-outline-200 rounded-lg w-full">
			<VStack className="gap-4">
				<Heading className="text-typography-900">Signup</Heading>
				<VStack space="xs">
					<Text className="text-typography-500">Email</Text>
					<Input variant="outline">
						<InputField
							value={email}
							onChangeText={(text) => onChangeEmail(text)}
							autoCapitalize={"none"}
						/>
					</Input>
				</VStack>
				<VStack space="xs">
					<Text className="text-typography-500">Password</Text>
					<Input variant="outline">
						<InputField
							value={password}
							onChangeText={(text) => onChangePassword(text)}
							type={showPassword ? "text" : "password"}
							secureTextEntry={!showPassword}
						/>
						<InputSlot
							className="pr-3"
							onPress={() => setShowPassword(!showPassword)}
						>
							<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
						</InputSlot>
					</Input>
				</VStack>
				<Button
					variant="outline"
					onPress={handleSignUpWithEmail}
					disabled={isLoading || error}
				>
					<ButtonText>Sign up</ButtonText>
					{isLoading && <ButtonSpinner color={"grey"} />}
				</Button>
			</VStack>
		</FormControl>
	);
}
