import { createStylesContext } from '@chakra-ui/system';
import { componentName } from './constants';

export const [MockupPhoneStylesProvider, useMockupPhoneStyles] =
	createStylesContext(componentName);
