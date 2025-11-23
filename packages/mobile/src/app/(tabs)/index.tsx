import useSession from "@/hooks/useSession";
import { useState } from "react";
import { Alert } from "react-native";
import { signInWithEmail } from "@/lib/auth";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSignInWithEmail = async () => {
		setIsLoading(true);
		if (!email || !password) {
			Alert.alert("Please enter your email and passsword to sign in");
			setIsLoading(false);
			return;
		}
		try {
			await signInWithEmail(email, password);
		} catch (err) {
			console.error("There was an unexpected error signing in:", err);

			if (err instanceof Error) {
				Alert.alert(err.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormControl className="p-4 border border-outline-200 rounded-lg w-full">
			<VStack className="gap-4">
				<Heading className="text-typography-900">Login</Heading>
				<VStack space="xs">
					<Text className="text-typography-500">Email</Text>
					<Input variant="outline">
						<InputField
							value={email}
							onChangeText={(text) => setEmail(text)}
							autoCapitalize={"none"}
						/>
					</Input>
				</VStack>
				<VStack space="xs">
					<Text className="text-typography-500">Password</Text>
					<Input variant="outline">
						<InputField
							value={password}
							onChangeText={(text) => setPassword(text)}
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
				<HStack space="md" className="justify-end">
					<Button onPress={handleSignInWithEmail} disabled={isLoading}>
						<ButtonText>Log in</ButtonText>
						{isLoading && <ButtonSpinner color="white" />}
					</Button>
				</HStack>
			</VStack>
		</FormControl>
	);
}
