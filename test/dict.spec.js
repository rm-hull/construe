import _ from "lodash";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";

import { loadWords, partitionByLetters } from "../src/dict";


chai.use(chaiAsPromised);
let should = chai.should();

describe("Dictionary", () => {

  describe("load words", () => {

    it("should load the correct lang file", () => {
      loadWords("en-GB").should.be.fulfilled;
    });

    it("should reject if attempting to load an incorrect lang file", () => {
      loadWords("ru-RU").should.be.rejected;
    });

    it("should yield buffer with specific size", (done) => {
      loadWords("en-GB").then(
        resolve => {
          resolve.toString().length.should.equal(938587);
          done();
        },
        done);
    });
  });

  describe("partition words by", () => {
    let testDict = [
      "hello", "hat", "gloves", "time", "normally",
      "at", "banana", "leaf", "lead", "and", "you",
      "melon", "lemon"
    ];

    it("should group 'melon' and 'lemon'", () => {
      let index = partitionByLetters(testDict);
      index.elmno.should.deep.equal(["melon", "lemon"]);
    });
  });
});


