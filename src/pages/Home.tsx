import Shuffle from "@/components/transitions/Shuffle";
import Centered from "../components/Centered";
import {
  Box,
  Button,
  Group,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Presence,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import useWordList from "@/hooks/useWordList";
import { findLongestWordAnagrams, solveAnagrams } from "@/utils/anagram";
import { getLocale } from "@/utils/locale";

const anagrams = ["trounces", "recounts", "counters", "cornutes", "construe"];

type SolveMode = "multi" | "longest" | "exact";

export default function Home() {
  const [finished, setFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [solving, setSolving] = useState(false);
  const [mode, setMode] = useState<SolveMode>("longest");
  const [minWordLength, setMinWordLength] = useState(4);

  const locale = getLocale();
  const { data: wordList, isLoading: wordListLoading } = useWordList(locale);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z? ]/g, "");
    setInputValue(value);
  }, []);

  const handleClick = useCallback(async () => {
    if (!inputValue.trim()) return;
    if (!wordList) return;

    setResults([]);
    setSolving(true);

    var solver: AsyncGenerator<string, any, any>;

    if (mode === "exact") {
      solver = findLongestWordAnagrams(wordList, inputValue, { minWordLength: inputValue.length });
    } else if (mode === "longest") {
      solver = findLongestWordAnagrams(wordList, inputValue, { minWordLength });
    } else {
      solver = solveAnagrams(wordList, inputValue, { minWordLength });
    }

    for await (const result of solver) {
      setResults((prev) => [...prev, result]);
    }
    setSolving(false);
  }, [inputValue, mode, minWordLength, wordList]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <Centered>
      <VStack mt={8}>
        <Shuffle
          wordList={anagrams}
          upperCase
          delay={750}
          maxIterations={anagrams.length - 1}
          onFinished={() => setFinished(true)}
        />
        <Presence present={finished} lazyMount animationName={{ _open: "fade-in", _closed: "fade-out" }}>
          <VStack>
            <Heading size="md">Anagram Solver</Heading>

            <HStack gap={4} alignItems="center">
              <Group>
                <Text fontSize="sm" color="fg.muted" mr={2}>
                  Mode
                </Text>
                <NativeSelect.Root w="140px" size="xs">
                  <NativeSelect.Field value={mode} onChange={(e) => setMode(e.target.value as SolveMode)}>
                    <option value="longest">Longest words</option>
                    <option value="multi">Multi-word</option>
                    <option value="exact">Exact</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Group>

              <Group>
                <Text fontSize="sm" color="fg.muted" mr={2}>
                  Min word length
                </Text>
                <NativeSelect.Root w="80px" size="xs">
                  <NativeSelect.Field
                    value={minWordLength}
                    onChange={(e) => setMinWordLength(parseInt(e.target.value, 10))}
                  >
                    {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Group>
            </HStack>

            <Group attached w="full" maxW="lg">
              <Input
                flex="1"
                placeholder="Enter words"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={wordListLoading || solving}
              />
              <Button
                bg="bg.subtle"
                variant="outline"
                onClick={handleClick}
                disabled={wordListLoading || solving || !inputValue.trim()}
              >
                {wordListLoading || solving ? <Spinner size="sm" mr={2} /> : null}
                {wordListLoading ? "Loading..." : "Submit"}
              </Button>
            </Group>

            {(solving || results.length > 0) && (
              <VStack w="full" maxW="lg" gap={2} align="stretch">
                <Group justify="space-between">
                  <Text fontSize="xs" color="fg.muted">
                    {solving
                      ? `Finding... ${results.length} result${results.length !== 1 ? "s" : ""} so far`
                      : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
                  </Text>
                </Group>
                <Box
                  overflowY="auto"
                  maxW="70vw"
                  maxH="70vh"
                  style={{
                    columnCount: 3,
                    columnGap: "2rem",
                  }}
                >
                  {results.map((result, i) => (
                    <Text key={i} fontSize="lg" textTransform="uppercase" pb={2} style={{ breakInside: "avoid" }}>
                      {result}
                    </Text>
                  ))}
                </Box>
              </VStack>
            )}
          </VStack>
        </Presence>
      </VStack>
    </Centered>
  );
}
