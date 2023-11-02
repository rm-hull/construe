import { Box, Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Centered({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Center>{children}</Center>
    </Box>
  );
}
