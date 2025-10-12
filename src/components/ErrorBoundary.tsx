import { Alert, AlertDescription, AlertIcon, AlertTitle, Code, Container, Heading } from "@chakra-ui/react";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error }: FallbackProps) {
  return (
    <Container maxWidth="container.lg">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Something went wrong:</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>

      <Container m={5}>
        <Heading size="sm">Stack trace</Heading>
        <Code background="none">
          <pre>{(error as Error).stack}</pre>
        </Code>
      </Container>
    </Container>
  );
}
