import { FormControl } from "@/components/ui/form-control";
import { useState } from "react";
import { Alert } from "react-native";
import { signUpWithEmail } from "@/lib/auth";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUpWithEmail = async () => {
    setIsLoading(true);
    if (!email || !password) {
      Alert.alert("Please enter your email and passsword to sign up");
      setIsLoading(false);
      return;
    }
    try {
      const session = await signUpWithEmail(email, password);

      if (session?.user)
        router.replace(
          `/auth/roleSelection?email=${email}&firstName=${firstName}&lastName=${lastName}`,
        );
    } catch (err) {
      console.error("Unexpected error occurred signing up:", err);

      if (err instanceof Error) {
        Alert.alert(err?.message);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeEmail = (text: string) => {
    setEmail(text);
    setError(false);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
    setError(false);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <FormControl className="mt-[80px] px-8">
        <VStack space="lg">
          <VStack space="md">
            <Heading className="text-center text-[25px] py-[4px] font-bold text-primary-500">
              Create Your Account
            </Heading>
            <Text className="text-sm font-light">
              Create an account to save your progress
            </Text>
            <Input variant="outline">
              <InputField
                value={firstName}
                onChangeText={(text) => setFirstname(text)}
                autoCapitalize={"none"}
                placeholder="First Name"
              />
            </Input>
            <Input variant="outline">
              <InputField
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                autoCapitalize={"none"}
                placeholder="Last Name"
              />
            </Input>
            <Input variant="outline">
              <InputField
                value={email}
                onChangeText={(text) => onChangeEmail(text)}
                autoCapitalize={"none"}
                placeholder="Email"
              />
            </Input>
            <Input variant="outline" className="">
              <InputField
                value={password}
                onChangeText={(text) => onChangePassword(text)}
                type={showPassword ? "text" : "password"}
                secureTextEntry={!showPassword}
                placeholder="Password (8+ characters)"
              />
              <InputSlot
                className=""
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            <Text className="text-xs">
              By creating your account, you agree to SafeStep's{" "}
              <Text className="underline text-xs">Terms &amp; Conditions</Text>{" "}
              and <Text className="underline text-xs">Privacy Policy</Text>.
            </Text>
          </VStack>
          <VStack className="mt-[125px] mb-16">
            <Button
              variant="outline"
              onPress={handleSignUpWithEmail}
              disabled={isLoading || error}
              className="rounded-[100px] bg-primary-500 border border-primary-500"
            >
              <ButtonText className="text-white text-center text-[15px]">
                Sign up
              </ButtonText>
              {isLoading && <ButtonSpinner color={"grey"} />}
            </Button>
            <Button className="py-[6px] bg-white border-[1px] rounded-[100px] my-[16px] flex flex-row justify-center items-center gap-2">
              <Image
                source={require("@/assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />

              <Text className="font-bold text-[15px]">Sign up with Google</Text>
            </Button>
            <Button className="text-center bg-white py-[6px] border-[1px] rounded-[100px] flex flex-row items-center justify-center">
              <FontAwesome name="apple" size={22} className="px-1" />
              <Text className="font-bold text-[15px] px-2">
                Sign up with Apple
              </Text>
            </Button>
          </VStack>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
