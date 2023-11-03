import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Shuffle from "./Shuffle";
import useCounter from "../../hooks/useCounter";
import * as R from "ramda";

type AppendProps = {
  wordList: string[];
  delay?: number;
  upperCase?: boolean;
  maxListSize?: number;
};

export default function Append({ wordList, delay = 1000, upperCase = false, maxListSize }: AppendProps): JSX.Element {
  const [animationParent] = useAutoAnimate();
  const [words, setWords] = useState<string[]>([]);

  const shouldCancel = (counter: number): boolean => counter >= wordList.length;
  const update = (counter: number): void =>
    setWords((prev) => R.takeLast(maxListSize ?? wordList.length, [...prev, wordList[counter]]));

  useCounter(delay, shouldCancel, update);

  return (
    <VStack ref={animationParent}>
      {words.map((word) => (
        <Shuffle key={word} wordList={[wordList[0], word]} upperCase={upperCase} maxIterations={1} delay={500} />
      ))}
    </VStack>
  );
}
