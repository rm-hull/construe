# Construe

Anagram solver built with React, TypeScript, and Vite.

Enter a word and get all valid multi-word anagrams, displayed incrementally as they are found.

## Word List

The solver uses the top 50,000 most frequently used English words from [david47k/top-english-wordlists](https://github.com/david47k/top-english-wordlists). The file `top_english_words_lower_50000.txt` is stored at `public/data/en-GB/words.txt`.

This frequency-based list focuses on common English vocabulary and excludes the archaic, scientific, and obscure terms found in Scrabble dictionaries.

## Tech Stack

- **Frontend:** React with TypeScript
- **Build:** Vite
- **Package manager:** pnpm
- **UI:** Chakra UI
- **Testing:** Vitest

## Commands

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm lint` — Lint the source code
- `pnpm format` — Format the source code with Prettier
- `pnpm test` — Run tests
