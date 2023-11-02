import { useInterval } from "@chakra-ui/react";
import { useState } from "react";

type ShouldCancel = (counter: number) => boolean;

export default function useCounter(delay: number, shouldCancel: ShouldCancel = () => false): number {
  const [counter, setCounter] = useState(0);
  useInterval(() => setCounter((prev) => prev + 1), shouldCancel(counter) ? null : delay);

  return counter;
}
