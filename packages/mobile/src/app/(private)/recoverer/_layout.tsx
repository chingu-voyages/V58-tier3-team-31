import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecovererLayout = () => {
  return (
    <Tabs>
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
        name="currentLocationMap"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="map" color={color} />
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
