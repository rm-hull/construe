import Shuffle from "@/components/transitions/Shuffle";
import Centered from "../components/Centered";
import Append from "../components/transitions/Append";

const anagrams = [
  "trounces",
  "recounts",
  "counters",
  "cornutes",
  "construe",
];

export default function Home() {
  return (
    <Centered>
      <Shuffle wordList={anagrams} upperCase delay={750} />
    </Centered>
  );
}
