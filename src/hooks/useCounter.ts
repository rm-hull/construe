import { useState } from "react";
import { useInterval } from "react-use";

type ShouldCancel = (counter: number) => boolean;
type Update = (counter: number) => void;

export default function useCounter(
  delay: number,
  shouldCancel: ShouldCancel = () => false,
  update: Update = () => {}
): number {
  const [counter, setCounter] = useState(0);
  useInterval(
    () => {
      update(counter);
      setCounter((prev) => prev + 1);
    },
    shouldCancel(counter) ? null : delay
  );

  return counter;
}
