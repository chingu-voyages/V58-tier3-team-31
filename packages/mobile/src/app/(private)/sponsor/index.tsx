import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import useSponsor from "@/hooks/useSponsor";
import getPendingInvitations from "@/lib/sponsors/getPendingInvitations";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SponsorDashboard = () => {
  const { sponsor, isLoading: isSponsorLoading } = useSponsor();
  const [pendingInvitations, setPendingInvitations] = useState<number>();

  const fetchPendingInvitations = useCallback(async () => {
    const invitations = await getPendingInvitations();
    setPendingInvitations(invitations.length);
  }, []);

  useFocusEffect(() => {
    fetchPendingInvitations();
  });

  if (isSponsorLoading) return <Text>Loading...</Text>;
  if (!sponsor) return <Text>Sponsor not found</Text>;

  return (
    <SafeAreaView>
      <VStack className="items-center gap-4 mt-8 mb-12">
        <Heading>Welcome, {sponsor?.first_name} 👋</Heading>
        <Avatar size="2xl">
          <AvatarImage source={require("@/assets/images/sponsor_avatar.png")} />
        </Avatar>
        <Link href="./sponsor/recoverers/invitations">
          <Text className="text-md font-medium underline text-blue-800">
            Pending invitations: {pendingInvitations}
          </Text>
        </Link>
      </VStack>
    </SafeAreaView>
  );
};

export default SponsorDashboard;
