import { cx } from '@chakra-ui/shared-utils';
import { forwardRef, HTMLChakraProps, chakra } from '@chakra-ui/react';
import { useMockupPhoneStyles } from './phone-context';
import { blockClassName } from './constants';

export interface MockupPhoneDisplayProps extends HTMLChakraProps<'div'> {}

export const MockupPhoneDisplay = forwardRef<MockupPhoneDisplayProps, 'div'>(
	function MockupPhoneDisplay(props, ref) {
		const { className, ...rest } = props;
		const styles = useMockupPhoneStyles();

		return (
			<chakra.div
				ref={ref}
				className={cx(`${blockClassName}__display`, className)}
				__css={styles.display}
				{...rest}
			/>
		);
	},
);
