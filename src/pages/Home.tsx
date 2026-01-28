import useWordList from "@/hooks/useWordList";
import Centered from "../components/Centered";
import Append from "../components/transitions/Append";
import { getAnagrams } from "@/anagram";

const anagrams = [
  // "anagrams",
  // "ars magna",

  "construe",
  "cornutes",
  "counters",
  "recounts",
  "trounces",
  "conster",
  "contuse",
  "conures",
  "cornets",
  "cornute",
  "counter",
  "couters",
  "creston",
  "cretons",
  "cronets",
  "croutes",
  "econuts",
  "encrust",
  "recount",
  "rounces",
  "scouter",
  "trounce",
  "uncoest",
  "tenours",
  "tonsure",
];

export default function Home() {
  const locale = "en-GB";
  const { data, isLoading, error } = useWordList(locale);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    throw error;
  }

  return (
    <Centered>
      <Append wordList={getAnagrams("construe", data ?? [], 20)} upperCase delay={750} />
    </Centered>
  );
}
