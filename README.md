# 1. construe (v.)

> make sense of; assign a meaning to

_construe_ is a (partial) node.js port of [ars magna](https://github.com/rm-hull/ars-magna)
deployed onto a [zeit.co/now](https://zeit.co/now#) instance.

## Build

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Dependency Status][david-badge]][david-url]

Run locally with:

    $ npm install
    $ gulp build
    $ node dist/app.js

## Usage

### Longest word anagrams

Find the longest single words from the given word; querying the web service for the word 'compute':

    $ curl -s https://construe-qoqzvwmfuq.now.sh/longest/compute | jq .

returns the same anagrams:

```json
[
  "compute",
  "comet",
  "coupe",
  "tempo",
  "come",
  "cope",
  "cote",
  "coup",
  "cute",
  "mope",
  "mote",
  "mute",
  "poem",
  "poet",
  "pout",
  "temp",
  "tome"
]
```

### Multiword anagrams

> TODO

## License

### The MIT License (MIT)

Copyright (c) 2016 Richard Hull

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[travis-badge]: https://api.travis-ci.org/rm-hull/construe.svg
[travis-url]: https://travis-ci.org/rm-hull/construe
[david-badge]: https://david-dm.org/rm-hull/construe.svg
[david-url]: https://david-dm.org/rm-hull/construe
[coverage-badge]: https://coveralls.io/repos/rm-hull/construe/badge.svg?branch=master
[coverage-url]: https://coveralls.io/r/rm-hull/construe?branch=master)
