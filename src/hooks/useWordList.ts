import type { AxiosError } from "axios";
import type { UseQueryResult } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";

export default function useWordList(locale: string): UseQueryResult<string[], AxiosError> {
  return useQuery(["words", locale], async () => {
    const resp = await axios.get<string>(`data/${locale}/words.txt`);
    return resp.data.split("\n");
  });
}
