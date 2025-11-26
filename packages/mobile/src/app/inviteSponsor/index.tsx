import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { TextInput, View } from "react-native";
import { Input, InputField } from "@/components/ui/input";

const inviteSponsor = () => {
	return (
		<SafeAreaView className="p-[30px] bg-white">
			<VStack>
				<Heading className="text-center text-[25px] py-[4px] font-bold text-[#2b5f69]">
					Invite a Sponsor
				</Heading>
				<Text className="text-[16px] mt-[24px] mb-[16px] font-light">
					Your sponsor will receive a message with instructions on how to
					download the app and connect with you.
				</Text>
				<VStack>
					<Input variant="outline">
						<InputField placeholder="Sponsor's Email" />
					</Input>
					<Input variant="outline" className="my-[28px]">
						<InputField placeholder="Sponsor's Phone Number" />
					</Input>
				</VStack>

				<VStack>
					<Heading className="text-left text-[24px] py-[4px] font-bold text-[#2b5f69]">
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
					<Heading className="text-left text-[24px] py-[4px] font-bold text-[#2b5f69]">
						Tags
					</Heading>
					<Text className="text-[16px] mt-[15px] mb-[16px] font-light">
						Assign tags to help define your relationship with your sponsor.
					</Text>
				</VStack>

				<View className="gap-[8px] flex-row flex-wrap pb-[40px]">
					<Text className="border-0 rounded-[100px] bg-[#E7E7E7] p-[8px] text-center text-[14px] font-light">
						Therapist
					</Text>
					<Text className="border border-dashed rounded-[100px] bg-[#E7E7E7] p-[8px] text-center text-[14px] font-light">
						Family x
					</Text>
					<Text className="border border-dashed rounded-[100px] p-[8px] text-center text-[14px] font-light">
						Add Tag +
					</Text>
				</View>
			</VStack>
		</SafeAreaView>
	);
};

export default inviteSponsor;
