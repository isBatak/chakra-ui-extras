import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useHeadroom } from "../libs/chakra-ui-headroom";

export const Header = () => {
  const { getWrapperProps, getInnerProps, status } = useHeadroom();

  console.log(status)

  return (
    <Box {...getWrapperProps()}>
      <Flex {...getInnerProps()} px={2} h="80px" bg="blue.400" justify="center" align="center">
        <Heading color="white">Headroom</Heading>
      </Flex>
    </Box>
  );
};
