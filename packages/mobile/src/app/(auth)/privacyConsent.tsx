import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

const PrivacyConsent = () => {
	return (
		<VStack
			space="lg"
			className="p-8 flex flex-col justify-center items-center"
		>
			<Heading className="font-bold text-4xl text-primary-500">
				Privacy Policy
			</Heading>
		</VStack>
	);
};

export default PrivacyConsent;
