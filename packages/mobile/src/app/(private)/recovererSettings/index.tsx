import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FontAwesome } from "@expo/vector-icons";
import { View, Switch } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon, ChevronRightIcon } from "@/components/ui/icon";
import { useState } from "react";
import useLocationTracker from "@/hooks/useLocationTracker";
import { Link } from "expo-router";

const recovererSettings = () => {
  const { startTracking, stopTracking } = useLocationTracker();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prev) => {
      const newState = !prev;

      if (newState) startTracking();
      else stopTracking();

      return newState;
    });
  };

  return (
    <VStack className="flex-1 bg-white p-10 justify-center" space="4xl">
      <VStack space="md" className="justify-start">
        <Heading className="text-2xl text-primary-500">Account Details</Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="user" size={30} color="#2A5E69" />
            </View>
            <Text>View/Edit Profile</Text>
          </View>
          <Link href="./recovererSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
        </HStack>
      </VStack>

      <VStack space="md">
        <Heading className="text-2xl text-primary-500">
          Location Tracking
        </Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="map-marker" size={30} color="#2A5E69" />
            </View>
            <Text>Enable Location Tracking</Text>
          </View>
          <Switch value={isEnabled} onValueChange={toggleSwitch} />
        </HStack>
      </VStack>

      <VStack space="md">
        <Heading className="text-2xl text-primary-500">
          Notification Preferences
        </Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="bell" size={30} color="#2A5E69" />
            </View>
            <Text>Notification Settings</Text>
          </View>
          <Link href="./recovererSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
        </HStack>
      </VStack>

      <VStack space="md">
        <Heading className="text-2xl text-primary-500">Privacy</Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="unlock-alt" size={30} color="#2A5E69" />
            </View>
            <Text>Privacy Information</Text>
          </View>
          <Link href="./recovererSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default recovererSettings;
