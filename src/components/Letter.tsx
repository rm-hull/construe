import { Box, Kbd } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Letter({ children }: PropsWithChildren) {
  if (children === " ") {
    return <Box m={0.5} />;
  }
  return <Kbd size="xl">{children}</Kbd>;
}
