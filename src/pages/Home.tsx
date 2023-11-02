import Shuffle from "../components/transitions/Shuffle";
import Centered from "../components/Centered";

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
      <Shuffle wordList={anagrams} upperCase />
    </Centered>
  );
}
