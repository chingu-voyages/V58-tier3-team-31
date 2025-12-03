import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading/index";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import getAllSponsorRecoverers, {
  type SponsorRecoverers,
} from "@/lib/sponsors/getSponsorRecoverers";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Recoverers() {
  const [isLoading, setIsLoading] = useState(true);
  const [recoverers, setRecoverers] = useState<SponsorRecoverers>([]);

  useEffect(() => {
    const fetchRecoverers = async () => {
      const recoverers = await getAllSponsorRecoverers();
      setRecoverers(recoverers || []);
      setIsLoading(false);
    };
    fetchRecoverers();
  }, []);

  if (isLoading) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          <Text>Loading...</Text>
        </VStack>
      </ScrollView>
    );
  }

  if (!recoverers || recoverers.length === 0) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          <Text>No recoverers, yet.</Text>
          <Link href="/sponsor/recoverers/invitations" asChild>
            <Button className="bg-primary-600 rounded-full" size="xl">
              <ButtonText className="text-white">See invitations</ButtonText>
            </Button>
          </Link>
        </VStack>
      </ScrollView>
    );
  }

  if (!isLoading && recoverers.length > 0) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          {recoverers.map((recoverer) => (
            <HStack
              key={recoverer.id}
              className="p-4 border border-gray-200 rounded-lg items-center gap-4"
            >
              <Avatar>
                <AvatarImage
                  source={require("@/assets/images/recoverer_avatar.png")}
                />
              </Avatar>
              <Heading size="lg" className="text-gray-900 font-semibold">
                {recoverer.first_name} {recoverer.last_name}
              </Heading>
              <Button className="ml-auto bg-primary-600 rounded-full">
                <ButtonText className="text-white">View</ButtonText>
              </Button>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <VStack className="flex-1 p-4 gap-6">
        <Text>Loading...</Text>
        <Link href="/sponsor/recoverers/invitations" asChild>
          <Button className="bg-primary-600 rounded-full">
            <Text className="text-white">Invitations</Text>
          </Button>
        </Link>
      </VStack>
    </ScrollView>
  );
}
