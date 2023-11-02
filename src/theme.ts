import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Kbd: defineStyleConfig({
      sizes: {
        xl: defineStyle({
          fontSize: "xl",
        }),
      },
    }),
  },
});
