import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Alert } from "react-native";
import useSession from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";

const inviteSponsor = () => {
	const { session } = useSession();
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handler = async () => {
		console.log("session in handler:", session);
		setIsLoading(true);

		try {
			const { data, error } = await supabase.functions.invoke(
				"invite-sponsor",
				{
					body: JSON.stringify({
						message: message,
						phone: phone,
						email: email,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${session?.access_token}`,
					},
				},
			);

			if (error) {
				console.error("Error sending email:", error);
				Alert.alert("Failed to send invite. Check console for details");
				return;
			}

			console.log("edge function data:", data);

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
