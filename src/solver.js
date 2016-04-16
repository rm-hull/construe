import _ from "lodash";
import combinatorics from "js-combinatorics";


export function longest(index, word, minSize) {
  let letters = Array.from(word).sort();
  return _
   .chain(_.range(minSize, word.length + 1))
   .flatMap((n) => combinatorics.combination(letters, n).map((w) => w.join("")))
   .flatMap((w) => index[w])
   .reject(w => !w)
   .uniq()
   .sortBy((w) => -w.length, _.identity)
   .value();
}
