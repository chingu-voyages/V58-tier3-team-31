import { Actionsheet, ActionsheetContent } from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Link, usePathname } from "expo-router";

export default () => {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";
  return (
    <View className="bg-primary-900 h-full">
      <Actionsheet isOpen={isRootRoute}>
        <ActionsheetContent>
          <VStack className="mb-4 gap-4 w-full px-4 justify-center py-5">
            <HStack className="justify-center items-center gap-2">
              <Heading
                className="text-center text-primary-900 font-bold text-3xl"
                size="xl"
              >
                SafeStep
              </Heading>
            </HStack>
            <Text className="text-center">
              A supportive companion on the recovery journey—helping Recoverers
              stay away from high-risk moments and enabling Sponsors to offer
              care and guidance when it’s needed most.
            </Text>
            <Link href="/auth/SignUp" asChild>
              <Button
                className="w-full rounded-full bg-primary-900 font-semibold"
                size="xl"
              >
                <ButtonText>Create account</ButtonText>
              </Button>
            </Link>
            <Link href="/auth/SignIn" asChild>
              <Button
                className="w-full rounded-full bg-slate-100 font-semibold"
                size="xl"
              >
                <ButtonText className="text-primary-900">Login</ButtonText>
              </Button>
            </Link>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
};
