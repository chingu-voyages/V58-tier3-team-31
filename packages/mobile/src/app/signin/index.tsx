import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const SignIn = () => {
	return (
		<SafeAreaView className="flex-1 justify-between">
			<View className="mt-[80px]">
				<Text className="text-center text-[25px] py-[4px] font-bold text-[#2b5f69]">
					Login
				</Text>
				<View className="px-[24px]">
					<Text className="text-[16px] mt-[24px] mb-[16px] font-light">
						Login to your SafeStep account
					</Text>
					<TextInput
						placeholder="Email"
						className="border rounded-[8px] border-[#D1D1D1] text-[15.5px] p-[12px]"
					></TextInput>
					<TextInput
						placeholder="Password"
						className="border rounded-[8px] border-[#D1D1D1] text-[15.5px] my-[15px] p-[12px]"
					></TextInput>
					<Link href="/" className="text-[#2b5f69]">
						I forgot my Password
					</Link>
				</View>
			</View>
			<View className="items-center">
				<Link
					href="/"
					className="py-[16px] px-[150px] text-white font-bold bg-[#2b5f69] border border-[#2b5f69] rounded-[100px]"
				>
					Login
				</Link>
				<Link
					href="/"
					className="py-[16px] px-[100px] font-bold border rounded-[100px] my-[16px]"
				>
					Sign in with Google
				</Link>
				<Link
					href="/"
					className="py-[16px] px-[100px] font-bold border rounded-[100px] "
				>
					Sign in with Google
				</Link>
			</View>
		</SafeAreaView>
	);
};

export default SignIn;
