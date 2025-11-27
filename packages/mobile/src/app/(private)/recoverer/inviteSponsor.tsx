import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Alert } from "react-native";

const inviteSponsor = () => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handler = async () => {
		console.log("email:", email);
		console.log("phone:", phone);
		console.log("message:", message);
		setIsLoading(true);

		try {
			const response = await fetch(
				"http://localhost:54321/functions/v1/invite-sponsor",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						phone,
						message,
					}),
				},
			);

			const data = await response.json();

			if (!response.ok) {
				console.error("Error sending email:", data);
				Alert.alert("Failed to send invite. Check console for details");
				return;
			}

			Alert.alert("Sponsor invidation sent successfully!");
			setEmail("");
			setPhone("");
			setMessage("");
		} catch (err) {
			console.error("Network or server error:", err);
			Alert.alert("Something went wrong. Check the console for details");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormControl className="bg-white flex-1">
			<VStack space="lg">
				<Input variant="outline">
					<InputField
						value={email}
						placeholder="Sponsor Email"
						onChangeText={(text: string) => setEmail(text)}
					/>
				</Input>
				<Input>
					<InputField
						value={phone}
						placeholder="Sponsor Phone"
						onChangeText={(text: string) => setPhone(text)}
					/>
				</Input>
				<Textarea size="md">
					<TextareaInput
						onChangeText={(text) => setMessage(text)}
						placeholder="e.g., Hi [Sponsor's Name], I'd like to invite you to be my sponsor on Safestep"
					/>
				</Textarea>
				<Button disabled={isLoading} onPress={handler}>
					<ButtonText>Invite Sponsor</ButtonText>
					{isLoading && <ButtonSpinner color="grey" />}
				</Button>
			</VStack>
		</FormControl>
	);
};

export default inviteSponsor;
