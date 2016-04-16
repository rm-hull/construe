import _ from "lodash";

import fs from "fs";
import path from "path";

export function loadWords(lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "../resources/data/", lang, "words"), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function splitLines(data) {
  return Promise.resolve(data.toString().split("\n"));
}

function partitionWordsBy(aggregator) {
  return function(dict) {
    return _.reduce(dict, (acc, word) => {
      let w = aggregator(word);
      acc[w] = acc[w] || [];
      acc[w].push(word);
      return acc;
    }, {});
  };
}

export let partitionByLetters = partitionWordsBy((w) => Array.from(w).sort().join(""));
