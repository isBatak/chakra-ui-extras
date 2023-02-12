import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

export interface IBannerProps {}

export const Banner: FC<IBannerProps> = () => {
	return (
		<Box bgGradient="linear(to-r,#fc4a1a,#f7b733)">
			<Container py="10">
				<Heading textAlign="center" color="white" size="4xl" mb="2">
					Headroom
				</Heading>
				<Text textAlign="center" color="white" fontWeight="bold">
					Give your pages some headroom. Hide your header until you need it.
				</Text>
			</Container>
		</Box>
	);
};
