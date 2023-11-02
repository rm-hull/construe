import useWordList from "../hooks/useWordList";
import Transitions from "../components/Transition";
import { useMemo } from "react";
import Centered from "../components/Centered";

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default function Words(): JSX.Element {
  const locale = "en-GB";
  const { data, isLoading, error } = useWordList(locale);
  const shuffled = useMemo(() => shuffleArray(data ?? []), [data]);

  if (isLoading) {
    return <Centered>Loading...</Centered>;
  }

  if (error !== null) {
    throw error;
  }

  return (
    <Centered>
      <Transitions wordList={shuffled} upperCase />
    </Centered>
  );
}
