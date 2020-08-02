# Gilded Rose

Gilded Rose kata solution in Node.js

## Getting started

Install dependencies

```sh
npm install
```

Generate input and output files

```sh
npm start
```
This will generate and then update input file with 100 million lines

You can run generate and update script separately
```sh
npm run generate {outputFile} {lines}
```
```sh
npm run update {inputFile} {outputFile} {daysToSimulate}
```
Generated files will be stored inside data folder.
## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```
