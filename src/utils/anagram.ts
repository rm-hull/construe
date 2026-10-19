import { rarestLetter } from "./letter-frequencies";

// Index partitioned by word length: { 3: ["the", "and"], 4: ["word", "test"], ... }
type IndexByLength = { [length: number]: string[] };

// Index partitioned by sorted letters: { "ceenrrstu": ["construe", "recounts"], ... }
type IndexByLetters = { [key: string]: string[] };

function sortLetters(word: string): string {
  return word.split("").sort().join("");
}

function buildIndexByLength(wordList: string[]): IndexByLength {
  const index: IndexByLength = {};
  for (const word of wordList) {
    const w = word.toLowerCase();
    const len = w.length;
    if (!index[len]) index[len] = [];
    index[len].push(w);
  }
  return index;
}

function buildIndexByLetters(wordList: string[]): IndexByLetters {
  const index: IndexByLetters = {};
  for (const word of wordList) {
    const w = word.toLowerCase();
    const key = sortLetters(w);
    if (!index[key]) index[key] = [];
    index[key].push(w);
  }
  return index;
}

// Check if a target word can be made from the source letters
function canMake(source: string, target: string): boolean {
  if (!target) return true;
  const char = target[0];
  const idx = source.indexOf(char);
  if (idx === -1) return false;
  return canMake(source.slice(0, idx) + source.slice(idx + 1), target.slice(1));
}

// Remove the letters of word2 from word1
function remainingChars(word1: string, word2: string): string {
  if (!word2) return word1;
  return remainingChars(word1.replace(word2[0], ""), word2.slice(1));
}

// Get words from the index, iterating from the largest size down to minSize
function* wordsOfSize(index: IndexByLength, max: number, minSize: number): Generator<string> {
  for (let size = max; size >= minSize; size--) {
    const words = index[size];
    if (words) {
      for (const w of words) {
        yield w;
      }
    }
  }
}

// Find words in the index that can be made from the given letters
function findIn(index: IndexByLength, word: string, minSize: number): string[] {
  const rarest = rarestLetter(word);
  const results: string[] = [];
  for (const w of wordsOfSize(index, word.length, minSize)) {
    if (w.includes(rarest) && canMake(word, w)) {
      results.push(w);
    }
  }
  return results;
}

// Recursively find multi-word anagrams
async function* multiWordAsync(
  index: IndexByLength,
  word: string,
  minSize: number,
  prefix: string,
  count: { current: number }
): AsyncGenerator<string> {
  if (!word) {
    yield prefix.trim();
    count.current++;
    // Yield control periodically to keep UI responsive
    if (count.current % 50 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return;
  }
  const candidates = findIn(index, word, minSize);
  for (let i = 0; i < candidates.length; i++) {
    const w = candidates[i];
    yield* multiWordAsync(index, remainingChars(word, w), minSize, `${w} ${prefix}`, count);
    // Yield control periodically between branches to keep UI responsive
    if (count.current % 25 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}

/**
 * Find all multi-word anagrams.
 * @param wordList - The dictionary of valid words
 * @param input - The input letters to find anagrams for
 * @param options - Optional configuration
 */
export async function* solveAnagrams(
  wordList: string[],
  input: string,
  options: { minWordLength?: number } = {}
): AsyncGenerator<string> {
  const { minWordLength = 2 } = options;
  const normalized = input.toLowerCase().replace(/[^a-z]/g, "");
  const index = buildIndexByLength(wordList);
  const count = { current: 0 };
  for await (const result of multiWordAsync(index, normalized, minWordLength, "", count)) {
    yield result;
  }
}

/**
 * Find the longest single-word anagrams — words that use all or most of the input letters.
 * Returns results sorted by word length (longest first).
 */
export async function* findLongestWordAnagrams(
  wordList: string[],
  input: string,
  options: { minWordLength?: number } = {}
): AsyncGenerator<string> {
  const { minWordLength = 3 } = options;
  const normalized = input.toLowerCase().replace(/[^a-z]/g, "");
  const sortedInput = sortLetters(normalized);
  const indexByLetters = buildIndexByLetters(wordList);

  // Collect all matching single words with their lengths
  const matches: Array<{ word: string; length: number }> = [];

  // First, check for exact anagrams (same length, same letters)
  const exactMatches = indexByLetters[sortedInput];
  if (exactMatches) {
    for (const word of exactMatches) {
      matches.push({ word, length: word.length });
    }
  }

  // Then find words that can be made from the input letters
  const indexByLength = buildIndexByLength(wordList);
  for (const w of findIn(indexByLength, normalized, minWordLength)) {
    // Skip if already added as exact match
    if (!matches.some((m) => m.word === w)) {
      matches.push({ word: w, length: w.length });
    }
  }

  // Sort by length descending, then alphabetically
  matches.sort((a, b) => b.length - a.length || a.word.localeCompare(b.word));

  for (const { word } of matches) {
    yield word;
  }
}
