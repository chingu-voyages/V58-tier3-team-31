import useSponsor from "@/hooks/useSponsor";
import { View, Text } from "react-native";

const SponsorDashboard = () => {
	const { sponsor, isLoading } = useSponsor();

	if (isLoading) return <Text>Loading...</Text>;
	if (!sponsor) return <Text>Sponsor not found</Text>;

	console.log("sponsor:", sponsor);

	return (
		<View>
			<Text>Welcome, {sponsor?.firstName}</Text>
		</View>
	);
};

export default SponsorDashboard;
