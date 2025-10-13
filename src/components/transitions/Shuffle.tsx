import { HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import Letter from "../Letter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCounter from "../../hooks/useCounter";

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
};

export default function Shuffle({ wordList, delay = 3000, upperCase = false, maxIterations }: ShuffleProps) {
  const [animationParent] = useAutoAnimate();
  const shouldCancel = (counter: number): boolean => maxIterations !== undefined && counter >= maxIterations;
  const counter = useCounter(delay, shouldCancel);

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
