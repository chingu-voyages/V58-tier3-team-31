import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";

const inviteSponsor = () => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handler = () => {
		console.log("email:", email);
		console.log("phone:", phone);
		console.log("message:", message);
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
