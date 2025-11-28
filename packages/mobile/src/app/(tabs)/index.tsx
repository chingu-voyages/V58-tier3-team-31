import { useState } from "react";
import { Alert } from "react-native";
import { signInWithEmail, fetchUserRole } from "@/lib/auth";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import type { UserRole } from "@/types/users";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";

export default function LogIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSignInUserRole = async () => {
		setIsLoading(true);
		if (!email || !password) {
			Alert.alert("Please enter your email and passsword to sign in");
			setIsLoading(false);
			return;
		}
		try {
			const user = await signInWithEmail(email, password);

			if (!user) return Alert.alert("User not found");

			const userRoleData: UserRole | null = await fetchUserRole(user.id);

			if (!userRoleData) return Alert.alert("User role not found");
			else if (userRoleData.role === "recoverer")
				router.replace("/(private)/recoverer");
			else if (userRoleData.role === "sponsor")
				router.replace("/(private)/sponsor");
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
		<SafeAreaView className="bg-white flex-1">
			<VStack space="lg" className="flex-1 justify-between p-8">
				<FormControl className="flex-1 justify-between p-8">
					<VStack space="md">
						<Heading className="text-center text-3xl font-bold text-primary-500">
							Login
						</Heading>
						<Text className="font-light">Login to your SafeStep account</Text>

						<VStack space="xs">
							<Input variant="outline">
								<InputField
									value={email}
									onChangeText={(text) => setEmail(text)}
									autoCapitalize={"none"}
									placeholder="Email"
								/>
							</Input>
						</VStack>

						<VStack space="xs">
							<Input variant="outline" className="my-[15px]">
								<InputField
									value={password}
									onChangeText={(text) => setPassword(text)}
									type={showPassword ? "text" : "password"}
									secureTextEntry={!showPassword}
									placeholder="Password"
								/>
								<InputSlot
									className="pr-3"
									onPress={() => setShowPassword(!showPassword)}
								>
									<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
								</InputSlot>
							</Input>
						</VStack>

						<Link href="/">I forgot my Password</Link>
					</VStack>

					<VStack space="lg">
						<Button
							variant="outline"
							onPress={handleSignInUserRole}
							disabled={isLoading}
							className="rounded-[100px] bg-primary-500 border border-primary-500"
						>
							<ButtonText className="text-white text-center">Login</ButtonText>
							{isLoading && <ButtonSpinner color={"grey"} />}
						</Button>
						<Button className="py-[6px] bg-white border-[1px] rounded-[100px] flex flex-row justify-center items-center gap-2">
							<Image
								source={require("@/assets/images/google.png")}
								style={{ width: 20, height: 20 }}
							/>

							<ButtonText className="font-bold text-black">
								Sign in with Google
							</ButtonText>
						</Button>
						<Button className="text-center bg-white py-[6px] border-[1px] rounded-[100px] flex flex-row items-center justify-center">
							<FontAwesome name="apple" size={22} className="px-2" />
							<ButtonText className="font-bold text-black">
								Sign in with Apple
							</ButtonText>
						</Button>
					</VStack>
				</FormControl>
			</VStack>
		</SafeAreaView>
	);
}
