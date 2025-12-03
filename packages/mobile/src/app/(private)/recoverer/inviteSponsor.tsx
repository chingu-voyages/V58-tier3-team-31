import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Alert } from "react-native";
import useSession from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";

const inviteSponsor = () => {
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteSponsor = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "invite-sponsor",
        {
          body: JSON.stringify({
            message: message,
            phone: phone,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );

      if (error) {
        console.error("Error sending email:", error);
        Alert.alert("Failed to send invite. Check console for details");
        return;
      }

      console.log("edge function data:", data);

      Alert.alert("Sponsor invidation sent successfully!");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Network or server error:", err);
      Alert.alert("Something went wrong. Check the console for details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 flex flex-col justify-center">
      <FormControl className="p-8 flex flex-col gap-3">
        <VStack space="lg">
          <Heading className="text-center text-3xl font-bold text-primary-500">
            Invite a Sponsor
          </Heading>
          <Text className="font-light">
            Your sponsor will receive a message with instructions on how to
            download the app and connect with you.
          </Text>
          <VStack space="md">
            <Input variant="outline">
              <InputField placeholder="Sponsor's Email" />
            </Input>
            <Input variant="outline" className="">
              <InputField placeholder="Sponsor's Phone Number" />
            </Input>
          </VStack>
          <VStack>
            <Heading className="text-left text-2xl font-bold text-primary-500">
              Add a Personal Message
            </Heading>
            <Textarea
              isDisabled={isLoading}
              className="border rounded-8 bg-white"
            >
              {" "}
              <TextareaInput placeholder="Hi [Sponsor's Name], I'd like to invite you to be my sponsor on Safestep" />{" "}
            </Textarea>
          </VStack>
          <VStack className="mt-[12px]">
            <Heading className="text-left text-2xl font-bold text-primary-500">
              Tags
            </Heading>
            <Text className="font-light">
              Assign tags to help define your relationship with your sponsor.
            </Text>
          </VStack>
          <HStack space="lg">
            <Text className="border-0 rounded-[100px] bg-gray-200 p-2 flex flex-col justify-center text-sm font-light text-center border-black">
              Therapist
            </Text>
            <Text className="border border-dashed rounded-[100px] bg-gray-200  p-2 flex flex-col justify-center text-sm font-light">
              Family
            </Text>
            <Text className="border border-dashed rounded-[100px] p-2 text-center text-sm font-light">
              Add Tag +
            </Text>
          </HStack>
        </VStack>
        <Button onPress={handleInviteSponsor} className="rounded-[100px]">
          <ButtonText>Send Invitation</ButtonText>
          {isLoading && <ButtonSpinner />}
        </Button>
      </FormControl>
    </SafeAreaView>
  );
};

export default inviteSponsor;
