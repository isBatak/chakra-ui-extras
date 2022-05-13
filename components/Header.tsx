import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useHeadroom } from "../libs/chakra-headroom";

export const Header = () => {
  const { ref } = useHeadroom();

  return (
    <Box>
      <Flex ref={ref} px={2} h="80px" bg="blue.400" justify="center" align="center">
        <Heading color="white">Headroom</Heading>
      </Flex>
    </Box>
  );
};
