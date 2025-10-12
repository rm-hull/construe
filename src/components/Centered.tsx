import { Box, Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Centered({ children }: PropsWithChildren) {
  return (
    <Box display="flex" alignItems="start" justifyContent="center">
      <Center>{children}</Center>
    </Box>
  );
}
