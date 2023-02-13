import {
	mergeThemeOverride,
	ThemeExtension,
	ComponentSingleStyleConfig,
	createMultiStyleConfigHelpers,
	defineStyle,
	cssVar,
} from '@chakra-ui/react';
import { anatomy } from '@chakra-ui/anatomy';
import { componentName } from './constants';

const mockupPhoneAnatomy = anatomy('mockup-phone').parts(
	'phone',
	'camera',
	'display',
);

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(mockupPhoneAnatomy.keys);

const $borderColor = cssVar('mockup-phone-border-color');
const $bgColor = cssVar('mockup-phone-background-color');
const $displayBgColor = cssVar('mockup-phone-display-background-color');

const baseStylePhone = defineStyle({
	display: 'inline-block',
	border: '4px solid',
	borderColor: $borderColor.reference,
	borderRadius: '50px',
	bgColor: $bgColor.reference,
	padding: 2.5,
	margin: '0 auto',
	overflow: 'hidden',
});

const baseStyleCamera = defineStyle({
	position: 'relative',
	top: 0,
	left: 0,
	bgColor: $bgColor.reference,
	height: '25px',
	width: '150px',
	margin: '0 auto',
	borderBottomLeftRadius: '17px',
	borderBottomRightRadius: '17px',
	zIndex: 1,
});

const baseStyleDisplay = defineStyle({
	position: 'relative',
	overflow: 'hidden',
	borderRadius: '40px',
	mt: '-25px',
	bg: $displayBgColor.reference,
	zIndex: 0,
});

const baseStyle = definePartsStyle({
	phone: baseStylePhone,
	camera: baseStyleCamera,
	display: baseStyleDisplay,
});

const variantNotch = definePartsStyle((props) => {
	const { colorScheme: c } = props;

	return {
		phone: {
			[$borderColor.variable]: `colors.${c}.500`,
			[$bgColor.variable]: 'colors.black',
			[$displayBgColor.variable]: 'colors.white',
			_dark: {
				[$borderColor.variable]: `colors.${c}.400`,
				[$displayBgColor.variable]: 'colors.gray.600',
			},
		},
	};
});

const mockupPhoneTheme = defineMultiStyleConfig({
	baseStyle,
	variants: {
		notch: variantNotch,
	},
	defaultProps: {
		variant: 'notch',
		colorScheme: 'gray',
	},
});

export function withMockupPhone(
	themeOverride?: ComponentSingleStyleConfig,
): ThemeExtension {
	return (theme) => {
		const overriddenMockupPhoneTheme = mergeThemeOverride(
			mockupPhoneTheme,
			themeOverride,
		);

		return mergeThemeOverride(theme, {
			components: {
				[componentName]: overriddenMockupPhoneTheme,
			},
		});
	};
}

export default mockupPhoneTheme;
