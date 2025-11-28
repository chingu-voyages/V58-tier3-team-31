import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { TextInput } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useState } from "react";

const inviteSponsor = () => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<SafeAreaView className="bg-white flex-1">
			<FormControl className="p-8 flex flex-col gap-3">
				<VStack space="lg">
					<Heading className="text-center text-3xl font-bold text-primary-500">
						Invite a Sponsor
					</Heading>
					<Text className="font-light">
						Your sponsor will receive a message with instructions on how to
						download the app and connect with you.
					</Text>
					<VStack space="md">
						<Input variant="outline">
							<InputField placeholder="Sponsor's Email" />
						</Input>
						<Input variant="outline" className="">
							<InputField placeholder="Sponsor's Phone Number" />
						</Input>
					</VStack>
					<VStack>
						<Heading className="text-left text-2xl font-bold text-primary-500">
							Add a Personal Message
						</Heading>
						<TextInput
							placeholder="Write your message here..."
							placeholderTextColor="#bbbabb"
							multiline
							numberOfLines={5}
							className="border rounded-[8px] border-[#D1D1D1] bg-white text-[15.5px] h-[180px] my-[15px] p-[8px]"
						/>
					</VStack>
					<VStack className="mt-[12px]">
						<Heading className="text-left text-2xl font-bold text-primary-500">
							Tags
						</Heading>
						<Text className="font-light">
							Assign tags to help define your relationship with your sponsor.
						</Text>
					</VStack>
					<HStack space="lg">
						<Text className="border-0 rounded-[100px] bg-gray-200 p-2 flex flex-col justify-center text-sm font-light text-center border-black">
							Therapist
						</Text>
						<Text className="border border-dashed rounded-[100px] bg-gray-200  p-2 flex flex-col justify-center text-sm font-light">
							Family
						</Text>
						<Text className="border border-dashed rounded-[100px] p-2 text-center text-sm font-light">
							Add Tag +
						</Text>
					</HStack>
				</VStack>
				<Button className="rounded-[100px]">
					<ButtonText>Send Invitation</ButtonText>
					{isLoading && <ButtonSpinner />}
				</Button>
			</FormControl>
		</SafeAreaView>
	);
};

export default inviteSponsor;
