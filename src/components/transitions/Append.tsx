import { HStack, VStack, useInterval } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Letter from "../Letter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Shuffle from "./Shuffle";

type AppendProps = {
  wordList: string[];
  delay?: number;
  upperCase?: boolean;
  maxListSize?: number;
};

export default function Append({ wordList, delay = 3000, upperCase = false, maxListSize }: AppendProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [animationParent] = useAutoAnimate();
  const shouldCancel = index >= wordList.length;

  useInterval(() => setIndex((prev) => prev + 1), shouldCancel ? null : delay);

  return <VStack ref={animationParent}></VStack>;
}
