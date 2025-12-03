import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@/components/ui/button";

const addSponsor = () => {
  return (
    <SafeAreaView className="bg-white flex-1 flex-col justify-between">
      <Pressable onPress={() => router.replace("/recoverer")} className="p-5">
        <Ionicons name="arrow-back" size={28} color="bg-primary-500" />
      </Pressable>
      <VStack space="lg">
        <Heading className="text-center text-3xl font-bold text-primary-500">
          My Sponsors
        </Heading>
        <Image
          source={require("@/assets/images/mySponsorImg.png")}
          className="align-center m-auto"
        />
      </VStack>

      <VStack space="lg">
        <VStack space="md" className="p-14">
          <Heading className="text-left font-medium text-primary-500">
            No Sponsor Invitations Yet
          </Heading>
          <Text className="font-light">
            You haven’t invited any sponsors yet. Once you do, they can connect
            with you and support your journey.
          </Text>
          <Button
            onPress={() => router.push("/recoverer/inviteSponsor")}
            className="text-center text-white font-bold bg-primary-500 border border-primary-500 rounded-[100px]"
          >
            <ButtonText>+ Add New Sponsor</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default addSponsor;
