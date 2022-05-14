import { Box, Flex, Heading } from "@chakra-ui/layout";
import { SystemProps } from "@chakra-ui/react";
import { useHeadroom } from "../libs/chakra-ui-headroom";

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
    <Box {...getWrapperProps()}>
      <Flex
        {...getInnerProps()}
        px={2}
        h="80px"
        justify="center"
        align="center"
        transition="box-shadow 0.5s ease, height 0.5s ease, margin 0.5s ease"
        bg="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(5px)"
        {...(isUnfixed ? unfixedStyles : pinnedStyles)}
      >
        <Heading>Headroom</Heading>
      </Flex>
    </Box>
  );
};
