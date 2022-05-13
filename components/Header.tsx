import { Box } from "@chakra-ui/layout";
import { useHeadroom } from "../libs/chakra-headroom";

export const Header = () => {
  const { ref } = useHeadroom();

  return (
    <Box>
      <Box ref={ref} maxW="1024px" px={2} h="md">
        navigation
      </Box>
    </Box>
  );
};
