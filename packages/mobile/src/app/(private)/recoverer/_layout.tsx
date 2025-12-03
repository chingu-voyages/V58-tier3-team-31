import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecovererLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sponsors"
        options={{
          title: "Sponsors",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Log Out",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="sign-out" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RecovererLayout;
