import express from "express";

import { loadWords, splitLines, partitionByLetters } from "./dict";
import { longest } from "./solver";


function makeIndex(lang) {
  return loadWords(lang)
    .then(splitLines)
    .then((words) => {
      return Promise.resolve({
        dict: words,
        index: {
          sortedLetter: partitionByLetters(words)
        }
      });
    });
}

function clean(word) {
  return word.toLowerCase().replace(/\W/g, "");
}

makeIndex("en-GB").then((resolve) => {

  const app = express();

  app.get("/longest/:word/", (req, res) => {
    res.json(longest(resolve.index.sortedLetter, clean(req.params.word), req.query.min || 4));
  });

  app.listen(3000);
});
