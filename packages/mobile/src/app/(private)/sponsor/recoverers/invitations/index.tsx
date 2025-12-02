import { useState, useCallback, useEffect } from "react";
import getPendingInvitations, {
  type Invitations,
} from "@/lib/sponsors/getPendingInvitations";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, Text } from "react-native";
import acceptRecovererInvite from "@/lib/sponsors/acceptRecovererInvite";
import { useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";

export default function PendingInvitations() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingInvitations, setPendingInvitations] =
    useState<Invitations | null>(null);
  const router = useRouter();

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      // Call the function to accept the invitation
      const response = await acceptRecovererInvite(invitationId);
      if (response.success) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const fetchPendingInvitations = useCallback(async () => {
    const invitations = await getPendingInvitations();
    setPendingInvitations(invitations);
    setIsLoading(false);
  }, []);

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

  if (showSuccessModal) {
    return (
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          router.replace("/(private)/sponsor/recoverers");
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Invitation accepted 🌈</Heading>
          </ModalHeader>
          <ModalBody>
            <Text>You have accepted the invitation.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              action="primary"
              className="bg-primary-900 rounded-full"
              onPress={() => {
                router.replace("/(private)/sponsor/recoverers");
              }}
            >
              <ButtonText>My recoverers</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (pendingInvitations && pendingInvitations.length > 0) {
    return (
      <ScrollView className="flex-1 bg-white">
        <VStack className="flex-1 p-4 gap-6">
          {pendingInvitations.map((invitation) => (
            <VStack
              key={invitation.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <Text className="text-gray-800 text-lg">
                Invitation from {invitation.recoverer.first_name}{" "}
                {invitation.recoverer.last_name} is pending.
              </Text>
              <Text className="text-gray-600 mt-2 text-lg">
                Recover Message: {invitation.recoverer_message}
              </Text>
              <Button
                className="mt-4 bg-primary-600 rounded-full"
                onPress={() => handleAcceptInvitation(invitation.id)}
              >
                <ButtonText className="text-white">Accept</ButtonText>
              </Button>
              <Button className="mt-4 rounded-full bg-zinc-300 ">
                <ButtonText className="text-primary-900">Decline</ButtonText>
              </Button>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <VStack className="flex-1 p-4 gap-6">
        <Text>No pending invitations.</Text>
      </VStack>
    </ScrollView>
  );
}
