import { HStack, useInterval } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Letter from "./Letter";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type TransitionProps = {
  wordList: string[];
  delay?: number;
  upperCase?: boolean;
};

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

export default function Transitions({ wordList, delay = 3000, upperCase = false }: TransitionProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const [animationParent] = useAutoAnimate();

  useInterval(() => {
    setIndex((prev) => (prev + 1) % wordList.length);
  }, delay);

  const word = upperCase ? wordList[index]?.toUpperCase() : wordList[index];
  const keys = useMemo(() => generateKeys(word), [word]);

  return (
    <HStack ref={animationParent} spacing={0.5} p={1}>
      {word.split("").map((ch, index) => (
        <Letter key={keys[index]}>{ch}</Letter>
      ))}
    </HStack>
  );
}
