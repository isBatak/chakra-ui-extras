import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { useHeadroom } from 'react-hook-headroom';

export const Header = () => {
	const { getWrapperProps, getInnerProps } = useHeadroom();

	return (
		<Box as="header" {...getWrapperProps()}>
			<Flex
				{...getInnerProps()}
				px={2}
				transition="box-shadow 0.5s ease, height 0.5s ease, margin 0.5s ease"
				bg="white"
				sx={{
					'&[data-headroom="unfixed"]': {
						borderBottom: 'solid 1px',
						borderBottomColor: 'gray.200',
					},
					'&[data-headroom="pinned"]': {
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
						border: '1px solid rgba(255, 255, 255, 0.3)',
					},
					'&[data-headroom=unpinned]': {},
				}}
			>
				<Container display="flex" alignItems="center" gap="2" py="3">
					<Heading as="h1" size="md">
						<Text as="span" layerStyle="gradientText">
							Head
						</Text>
						room
					</Heading>
					<Button
						as="a"
						leftIcon={<BsGithub />}
						ml="auto"
						size="sm"
						href="https://github.com/isBatak/react-hook-headroom"
						target="_blank"
					>
						GitHub
					</Button>
					<Button as="a" leftIcon={<BsTwitter />} size="sm" href="https://twitter.com/_isBatak" target="_blank">
						@_isBatak
					</Button>
				</Container>
			</Flex>
		</Box>
	);
};
