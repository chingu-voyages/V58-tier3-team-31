import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Image } from "react-native";

const mySpnsor = () => {
	return (
		<SafeAreaView className="p-[30px] bg-white">
			<VStack>
				<Heading className="text-center text-[25px] py-[4px] font-bold text-[#2b5f69]">
					My Sponsors
				</Heading>

				<VStack>
					<Image
						source={require("@/assets/images/mySponsorImg.png")}
						style={{
							width: 330,
							height: 350,
							alignSelf: "center",
							marginTop: 30,
						}}
					/>
					<Heading className="text-left text-[18px] pt-[15px] font-medium text-[#2b5f69]">
						No Sponsor Invitations Yet
					</Heading>
					<Text className="text-[16px] my-[35px] font-light">
						You haven’t invited any sponsors yet. Once you do, they can connect
						with you and support your journey.
					</Text>
					<Link
						href="/"
						className="py-[16px] px-[15px] text-center text-white text-[15px] font-bold bg-[#2b5f69] border border-[#2b5f69] rounded-[100px]"
					>
						+ Add New Sponsor
					</Link>
				</VStack>
			</VStack>
		</SafeAreaView>
	);
};

export default mySpnsor;
