import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import getRecovererSponsor, { type Sponsor } from "@/lib/recoverers/getSponsor";
import { Link } from "expo-router";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      const sponsor = await getRecovererSponsor();
      setSponsor(sponsor);
    };
    fetchSponsorData();
    setIsLoading(false);
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

  if (!sponsor) {
    return (
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <VStack className="flex-1 p-4 gap-6">
          <HStack className="items-center gap-2 mt-2">
            <Heading size="xl" className="text-primary-900 font-bold">
              Invite a Sponsor
            </Heading>
          </HStack>

          {/* Info Text */}
          <VStack className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <Text className="text-sm text-gray-700">
              Your sponsor will receive a message with instructions on how to
              download the app and connect with you.
            </Text>
          </VStack>
          <Link href="/(private)/recoverer/sponsors/invite-sponsor" asChild>
            <Button>
              <ButtonText>Invite Sponsor</ButtonText>
            </Button>
          </Link>
        </VStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <VStack className="flex-1 p-4 gap-6">
        <HStack className="items-center justify-between p-4 bg-white rounded-xl border border-gray-200 ">
          <HStack className="items-center gap-3 flex-1">
            <Avatar size="lg">
              <AvatarImage
                source={require("@/assets/images/sponsor_avatar.png")}
              />
              <AvatarFallbackText>{sponsor.first_name}</AvatarFallbackText>
            </Avatar>
            <Heading size="lg" className="text-gray-900 font-semibold">
              {sponsor.first_name} {sponsor.last_name}
            </Heading>
          </HStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
};
