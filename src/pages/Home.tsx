import Centered from "../components/Centered";
import Append from "../components/transitions/Append";

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

export default function Home(): JSX.Element {
  return (
    <Centered>
      <Append wordList={anagrams} upperCase delay={750} />
    </Centered>
  );
}
