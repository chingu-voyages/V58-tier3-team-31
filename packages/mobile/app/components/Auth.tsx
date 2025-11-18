import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import { signUpWithEmail, signInWithEmail } from "@/lib/auth";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignUpWithEmail = async () => {
		setIsLoading(true);
		if (!email || !password) {
			Alert.alert("Please enter your email and passsword to sign up");
			setIsLoading(false);
			return;
		}
		try {
			await signUpWithEmail(email, password);
		} catch (err) {
			console.error("Unexpected error occurred signing up:", err);

			if (err instanceof Error) {
				Alert.alert(err?.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

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
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="Sign in"
					disabled={isLoading}
					loading={isLoading}
					onPress={handleSignInWithEmail}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={isLoading}
					loading={isLoading}
					onPress={handleSignUpWithEmail}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
		// borderWidth: 5,
		width: "100%",
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
		width: "100%",
		// borderWidth: 5
	},
	mt20: {
		marginTop: 20,
	},
});
