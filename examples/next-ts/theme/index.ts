import { extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  colors: {
    brand: {
      50: '#fec69f',
      100: '#fda96c',
      200: '#fd9a53',
      300: '#fc8b3a',
      400: '#fc7c21',
      500: '#E76203',
      600: '#b54d02',
      700: '#9b4202',
      800: '#823702',
      900: '#502201',
    },
  },
  layerStyles: {
    gradientText: {
      bgGradient: 'linear(to-l, #fc4a1a,#f7b733)',
      bgClip: 'text',
    },
  },
});

export default theme;
