import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SystemProps } from "@chakra-ui/react";
import { useHeadroom } from "react-hook-headroom";

const unfixedStyles: SystemProps = {
  borderBottom: "solid 1px",
  borderBottomColor: "gray.200",
};

const pinnedStyles: SystemProps = {
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  m: '10px',
  h: '60px'
};

export const Header = () => {
  const { getWrapperProps, getInnerProps, status } = useHeadroom();
  const isUnfixed = status === "unfixed";

  return (
    <Box as="header" {...getWrapperProps()}>
      <Flex
        {...getInnerProps()}
        px={2}
        transition="box-shadow 0.5s ease, height 0.5s ease, margin 0.5s ease"
        bg="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(5px)"
        {...(isUnfixed ? unfixedStyles : pinnedStyles)}
      >
        <Container>
           <Heading as="h1" size="md"><Text as="span" layerStyle="gradientText">Head</Text>room</Heading>
        </Container>
      </Flex>
    </Box>
  );
};
