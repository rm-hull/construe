/**
 * Generate all valid anagrams (including multi-word) of the given input,
 * using a provided list of valid words.
 */
export function getAnagrams(input: string, validWords: string[], maxWords: number = 3): string[] {
  const cleanInput = input.toLowerCase().replace(/[^a-z]/g, "");

  const candidates = validWords.map((w) => w.toLowerCase()).filter((w) => canMakeFrom(w, cleanInput));

  const results = new Set<string>();

  function buildAnagrams(remaining: string, current: string[]) {
    if (current.length > 0) {
      results.add(current.join(" "));
    }

    if (current.length >= maxWords) return;

    for (const word of candidates) {
      if (canMakeFrom(word, remaining)) {
        const newRemaining = removeLetters(remaining, word);
        if (newRemaining.length === 0) {
          results.add([...current, word].join(" "));
        } else {
          buildAnagrams(newRemaining, [...current, word]);
        }
      }
    }
  }

  buildAnagrams(cleanInput, []);
  return Array.from(results);
}

/** Utility: check if `word` can be made from `letters` */
function canMakeFrom(word: string, letters: string): boolean {
  const available = letters.split("");
  for (const ch of word) {
    const idx = available.indexOf(ch);
    if (idx === -1) return false;
    available.splice(idx, 1);
  }
  return true;
}

/** Utility: remove letters of `word` from `letters` */
function removeLetters(letters: string, word: string): string {
  const remaining = letters.split("");
  for (const ch of word) {
    const idx = remaining.indexOf(ch);
    if (idx !== -1) remaining.splice(idx, 1);
  }
  return remaining.join("");
}
