import { Flex, Text } from '@chakra-ui/react';
import {
	MockupPhone,
	MockupPhoneCamera,
	MockupPhoneDisplay,
} from '@isbatak/chakra-ui-mockup-phone';

export default function MockupPhonePage() {
	return (
		<MockupPhone colorScheme="orange">
			<MockupPhoneCamera />
			<MockupPhoneDisplay>
				<Flex w="320px" h="568px" justify="center" align="center">
					<Text>Mockup Phone</Text>
				</Flex>
			</MockupPhoneDisplay>
		</MockupPhone>
	);
}
