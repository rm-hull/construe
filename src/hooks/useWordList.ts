import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

export async function fetchWordList(locale: string): Promise<string[]> {
  const resp = await fetch(`${import.meta.env.BASE_URL}/data/${locale}/words.txt`);
  const text = await resp.text();
  return text.split("\n");
}

export default function useWordList(locale: string): UseQueryResult<string[], Error> {
  return useQuery(["words", locale], () => fetchWordList(locale));
}
