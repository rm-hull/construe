import { HStack } from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useMemo } from "react";
import useCounter from "../../hooks/useCounter";
import Letter from "../Letter";

function generateKeys(input: string): string[] {
  const charCounts: Record<string, number> = {};
  const result: string[] = [];

  for (const char of input) {
    const charCount = (charCounts[char] ?? 0) + 1;
    charCounts[char] = charCount;
    result.push(`${char}${charCount}`);
  }

  return result;
}

type ShuffleProps = {
  wordList: string[];
  delay?: number;
  upperCase?: boolean;
  maxIterations?: number;
  onFinished?: () => void;
};

export default function Shuffle({
  wordList,
  delay = 3000,
  upperCase = false,
  maxIterations,
  onFinished,
}: ShuffleProps) {
  const [animationParent] = useAutoAnimate();
  const shouldCancel = (counter: number): boolean => maxIterations !== undefined && counter >= maxIterations;
  const counter = useCounter(delay, shouldCancel);

  const isFinished = maxIterations !== undefined && counter >= maxIterations;
  useEffect(() => {
    if (isFinished && onFinished) {
      onFinished();
    }
  }, [isFinished, onFinished]);

  let word = wordList[counter % wordList.length];
  if (upperCase) {
    word = word?.toUpperCase();
  }
  const keys = useMemo(() => generateKeys(word), [word]);

  return (
    <HStack ref={animationParent} gap={0.5} p={1}>
      {word.split("").map((ch, index) => (
        <Letter key={keys[index]}>{ch}</Letter>
      ))}
    </HStack>
  );
}
