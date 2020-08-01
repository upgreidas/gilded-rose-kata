const { createReadStream, createWriteStream } = require('fs');
const { parse, transform, stringify } = require('csv');

/**
 * Count lines of given file.
 *
 * @param {string} filePath
 */
const countFileLines = (filePath) => {
  let count = 0;

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .on('error', (e) => {
        reject(e);
      })
      .on('data', (chunk) => {
        for (let i = 0; i < chunk.length; i += 1) {
          if (chunk[i] === 10) {
            count += 1;
          }
        }
      })
      .on('end', () => resolve(count));
  });
};

/**
 * Create CSV file transform stream.
 *
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {function} transformFunction
 */
const createTransformStream = (inputFile, outputFile, transformFunction, delimiter = '#') => {
  const from = createReadStream(inputFile);
  const to = createWriteStream(outputFile);

  const csvParser = parse({
    delimiter,
    cast: true,
  });

  const csvTransformer = transform(transformFunction);

  const stringifier = stringify({ delimiter });

  return new Promise((resolve, reject) => {
    from.pipe(csvParser)
      .pipe(csvTransformer)
      .pipe(stringifier)
      .pipe(to)
      .on('finish', resolve)
      .on('error', reject);
  });
};

module.exports = {
  countFileLines,
  createTransformStream,
};
