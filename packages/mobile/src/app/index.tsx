import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "@/components/custom/DashboardScreen";
import SignIn from "./signin";

const Drawer = createDrawerNavigator();

export default function Index() {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name="Home" component={DashboardScreen} />
				<Drawer.Screen name="Login" component={SignIn} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
