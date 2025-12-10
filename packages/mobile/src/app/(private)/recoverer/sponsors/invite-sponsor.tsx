import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import sendSponsorInvite from "@/lib/recoverers/sendSponsorInvite";
import getPendingInvitations, {
  type Invitations,
} from "@/lib/recoverers/getPendingInvitations";

export default () => {
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recovererMessage, setRecovererMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingInvitations, setPendingInvitations] =
    useState<Invitations | null>(null);

  const fetchPendingInvitations = useCallback(async () => {
    const invitations = await getPendingInvitations();
    setPendingInvitations(invitations);
    setIsLoading(false);
  }, []);

  const handleSendInvite = async () => {
    setIsLoading(true);
    try {
      const invitation = await sendSponsorInvite({
        sponsorEmail,
        recovererMessage,
        phoneNumber,
      });
      if (invitation) {
        fetchPendingInvitations();
      }
      // Handle success (e.g., show a success message or navigate)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending sponsor invite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingInvitations();
  }, [fetchPendingInvitations]);

  if (isLoading) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          <Text>Loading...</Text>
        </VStack>
      </ScrollView>
    );
  }

  if (pendingInvitations && pendingInvitations.length > 0) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          <Heading size="xl" className="text-primary-900 font-bold">
            Pending Invitations
          </Heading>
          {pendingInvitations.map((invitation) => (
            <VStack
              key={invitation.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <Text className="text-gray-800">
                Invitation to {invitation.sponsor.first_name}{" "}
                {invitation.sponsor.last_name} ({invitation.sponsor.email}) is
                pending.
              </Text>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <VStack className="flex-1 p-4 gap-6">
        {/* Header */}
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

        {/* Form */}
        <VStack className="gap-4">
          {/* Email Input */}
          <VStack className="gap-2">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Sponsor's Email"
                value={sponsorEmail}
                onChangeText={setSponsorEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
          </VStack>

          {/* Phone Number Input */}
          <VStack className="gap-2">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Sponsor's Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </Input>
          </VStack>

          {/* Personal Message Section */}
          <VStack className="gap-2 mt-2">
            <Heading size="lg" className="text-primary-900 font-semibold">
              Add a Personal Message
            </Heading>
            <Textarea size="lg">
              <TextareaInput
                placeholder="e.g., Hi [Sponsor's Name], I'd like to invite you to be my sponsor on SafeStep."
                value={recovererMessage}
                onChangeText={setRecovererMessage}
                multiline
                numberOfLines={8}
              />
            </Textarea>
          </VStack>
        </VStack>
        {/* Send Button */}
        <Button
          className="w-full rounded-full bg-primary-900 mt-4"
          size="xl"
          onPress={handleSendInvite}
          isDisabled={!sponsorEmail || !phoneNumber || isLoading}
        >
          <ButtonText className="font-semibold">
            {isLoading ? "Sending..." : "Send Invite"}
          </ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
};
