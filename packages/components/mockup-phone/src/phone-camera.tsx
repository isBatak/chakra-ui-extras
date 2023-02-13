import { cx } from '@chakra-ui/shared-utils';
import { forwardRef, HTMLChakraProps, chakra } from '@chakra-ui/react';
import { useMockupPhoneStyles } from './phone-context';
import { blockClassName } from './constants';

export interface MockupPhoneCameraProps extends HTMLChakraProps<'div'> {}

export const MockupPhoneCamera = forwardRef<MockupPhoneCameraProps, 'div'>(
	function MockupPhoneCamera(props, ref) {
		const { className, ...rest } = props;
		const styles = useMockupPhoneStyles();

		return (
			<chakra.div
				ref={ref}
				className={cx(`${blockClassName}__camera`, className)}
				__css={styles.camera}
				{...rest}
			/>
		);
	},
);
