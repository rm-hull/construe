# Construe

Anagram solver built with React, TypeScript, and Vite.

Enter a word and get all valid multi-word anagrams, displayed incrementally as they are found.

## Word List

The solver uses [CSW21](https://www.collinsdictionary.com/scrabble/csw21.php) (Collins Scrabble Words 2021), the UK and international Scrabble standard. The list contains 279,076 valid words.

The file was downloaded from a [public gist](https://gist.githubusercontent.com/scrabblewords/6b7d99f608cd428efe2a21228c62a788/raw/CSW21.txt) and stored at `public/data/en-GB/words.txt`.

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
