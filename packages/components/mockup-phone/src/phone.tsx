import { cx } from '@chakra-ui/shared-utils';
import {
	forwardRef,
	HTMLChakraProps,
	ThemingProps,
	chakra,
	omitThemingProps,
	useMultiStyleConfig,
} from '@chakra-ui/react';
import { blockClassName, componentName } from './constants';
import { MockupPhoneStylesProvider } from './phone-context';

export type MockupPhoneOptions = {};

export interface MockupPhoneProps
	extends HTMLChakraProps<'div'>,
		MockupPhoneOptions,
		ThemingProps<'MockupPhone'> {}

export const MockupPhone = forwardRef<MockupPhoneProps, 'div'>(
	function MockupPhone(props, ref) {
		const { className, children, ...rest } = omitThemingProps(props);

		const styles = useMultiStyleConfig(componentName, props);

		return (
			<chakra.div
				ref={ref}
				className={cx(blockClassName, className)}
				__css={styles.phone}
				{...rest}
			>
				<MockupPhoneStylesProvider value={styles}>
					{children}
				</MockupPhoneStylesProvider>
			</chakra.div>
		);
	},
);
