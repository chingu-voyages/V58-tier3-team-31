import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import useAuth from "../hooks/useAuth";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, signInWithEmail, signUpWithEmail } = useAuth();

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
					disabled={loading}
					loading={loading}
					onPress={() => signInWithEmail(email, password)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={loading}
					loading={loading}
					onPress={() => signUpWithEmail(email, password)}
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
