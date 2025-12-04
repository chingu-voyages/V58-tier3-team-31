import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const PrivacyConsent = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white flex flex-col justify-center items-center">
      <VStack space="lg" className="p-8 items-center">
        <Heading className="font-bold text-4xl text-primary-500">
          Privacy Policy
        </Heading>
        <VStack space="lg" className="items-center">
          <Text className="text-center">
            SafeStep collects location data to monitor your proximity to
            high-risk zones and notify your sponsor if you enter such areas.
            This data is encrypted and only accessible to you and your
            designated sponsor. We do not share your information with third
            parties. By using SafeStep, you agree to our Privacy Policy and
            Terms of Service.
          </Text>
          <Checkbox
            value="agree"
            isDisabled={false}
            isInvalid={false}
            size="md"
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>
              I agree to the Privacy Policy and Terms of Service
            </CheckboxLabel>
          </Checkbox>
          <Button
            className="w-full rounded-[100px] text-center flex justify-center items-center"
            isDisabled={!isChecked}
            size="lg"
            onPress={() => router.push("/auth/roleSelection")}
          >
            <ButtonText className="text-center m-auto">
              {isChecked ? "Continue" : "Accept & Continue"}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
