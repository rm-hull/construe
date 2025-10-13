import { Box, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
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

export default function Append({ wordList, delay = 1000, upperCase = false, maxListSize }: AppendProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [animationParent] = useAutoAnimate();
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [words]);

  const shouldCancel = useCallback((counter: number): boolean => counter >= wordList.length, [wordList]);
  const update = useCallback(
    (counter: number) => setWords((prev) => R.takeLast(maxListSize ?? wordList.length, [...prev, wordList[counter]])),
    [setWords, wordList]
  );

  useCounter(delay, shouldCancel, update);

  return (
    <VStack m={4} ref={animationParent}>
      {words.map((word) => (
        <Shuffle key={word} wordList={[wordList[0], word]} upperCase={upperCase} maxIterations={1} delay={500} />
      ))}
      <Box ref={bottomRef} />
    </VStack>
  );
}
