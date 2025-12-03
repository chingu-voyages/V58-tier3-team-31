import { Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import useSession from "@/hooks/useSession";
import { Alert } from "react-native";
import { useState } from "react";
import { signUpRecoverer, signUpSponsor } from "@/lib/auth";
import { useLocalSearchParams, useRouter } from "expo-router";

const RoleSelection = () => {
  const router = useRouter();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState<false | "recoverer" | "sponsor">(
    false,
  );

  const { email, firstName, lastName } = useLocalSearchParams<{
    email: string;
    firstName: string;
    lastName: string;
  }>();

  const handleSignUpSponsor = async () => {
    if (!session?.user) return Alert.alert("User not found");
    setIsLoading("sponsor");
    try {
      const sponsorData = await signUpSponsor({
        userId: session.user.id,
        firstName: firstName || "John",
        lastName: lastName || "Doe",
        email: email || "",
      });
      if (sponsorData?.id) router.push("/sponsor");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpRecoverer = async () => {
    if (!session?.user) return Alert.alert("User not found");
    setIsLoading("recoverer");
    try {
      const recovererData = await signUpRecoverer(session.user.id);
      if (recovererData?.id) router.push("/auth/locationConsent");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonWidth = 150; // match the column width

  return (
    <VStack space="xl" className="flex-1 items-center justify-center">
      {/* Heading */}
      <VStack space="sm" className="items-center">
        <Heading className="font-bold text-primary-500 text-4xl">
          What is your role?
        </Heading>
        <Text>Choose your role to get started</Text>
      </VStack>

      {/* Columns */}
      <HStack space="xl" className="items-start">
        <VStack
          space="md"
          className="items-center"
          style={{ maxWidth: buttonWidth }}
        >
          <Image
            alt="recoverer-image"
            source={require("@/assets/images/brain.png")}
            size="xl"
          />
          <Text>Recoverer</Text>
          <Text className="text-center">
            Focus on your recovery with support
          </Text>
        </VStack>

        <VStack
          space="md"
          className="items-center"
          style={{ maxWidth: buttonWidth }}
        >
          <Image
            alt="sponsor-image"
            source={require("@/assets/images/heart.png")}
            size="xl"
          />
          <Text>Sponsor</Text>
          <Text className="text-center">
            Support someone you care about on their journey
          </Text>
        </VStack>
      </HStack>

      {/* Buttons */}
      <HStack space="xl" className="mt-4">
        <Button onPress={handleSignUpRecoverer} style={{ width: buttonWidth }}>
          <ButtonText>Recoverer</ButtonText>
          {isLoading === "recoverer" && <ButtonSpinner color="white" />}
        </Button>
        <Button onPress={handleSignUpSponsor} style={{ width: buttonWidth }}>
          <ButtonText>Sponsor</ButtonText>
          {isLoading === "sponsor" && <ButtonSpinner color="white" />}
        </Button>
      </HStack>
    </VStack>
  );
};

export default RoleSelection;
