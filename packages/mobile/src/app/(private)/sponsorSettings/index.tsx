import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon, ChevronRightIcon } from "@/components/ui/icon";
import { Link } from "expo-router";

const sponsorSettings = () => {
  return (
    <VStack className="flex-1 bg-white p-10 justify-center" space="4xl">
      <VStack space="md" className="justify-start">
        <Heading className="text-2xl text-primary-500">Account Details</Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="user" size={33} color="#2A5E69" />
            </View>
            <Text>View/Edit Profile</Text>
          </View>
          <Link href="./sponsorSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
        </HStack>
      </VStack>

      <VStack space="md">
        <Heading className="text-2xl text-primary-500">
          Manage Recoverer
        </Heading>
        <HStack className="items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <View className="w-11 h-11 bg-[#FFEAE1] justify-center items-center">
              <FontAwesome name="users" size={30} color="#2A5E69" />
            </View>
            <Text>Manage Recoverer Connection</Text>
          </View>
          <Link href="./sponsorSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
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
          <Link href="./sponsorSettings/placeholder">
            <Icon as={ChevronRightIcon} />
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default sponsorSettings;
