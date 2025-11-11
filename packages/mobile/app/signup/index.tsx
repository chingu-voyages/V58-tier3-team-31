import { TextInput, View, Text } from "react-native";
import { useState } from "react";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<Text>Email</Text>
			<TextInput
				placeholder="Enter your email"
				onChangeText={(newEmail) => setEmail(newEmail)}
				defaultValue={email}
			></TextInput>
			<Text>Password</Text>
			<TextInput
				placeholder="Enter a password"
				onChangeText={(newPassword) => setPassword(newPassword)}
				defaultValue={password}
				secureTextEntry={true}
			></TextInput>
		</View>
	);
}
