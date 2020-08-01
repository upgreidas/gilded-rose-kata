const { join } = require('path');
const { SingleBar, Presets } = require('cli-progress');

const { countFileLines, createTransformStream } = require('./src/helpers');
const { Shop, Item } = require('./src');

const inputFile = join(__dirname, 'data', process.argv[2] || 'input');
const outputFile = join(__dirname, 'data', process.argv[3] || 'output');
const daysToSimulate = process.argv[4] || 5;

(async () => {
  console.log('Computing input file...');

  let ended = false;
  let linesProcessed = 0;
  let totalLineCount;

  try {
    totalLineCount = await countFileLines(inputFile);
  } catch (e) {
    return console.log(e.message);
  }

  console.log('Generating output file...');

  const transformFunction = (input) => {
    const item = new Item(input[0], input[2], input[1]);

    Shop.updateSingleItem(item, daysToSimulate);

    input[1] = item.quality;
    input[2] = item.sellIn;

    linesProcessed += 1;

    return input;
  };

  createTransformStream(inputFile, outputFile, transformFunction)
    .catch((e) => console.log(e))
    .then(
      () => {
        ended = true;
      },
      (e) => {
        console.log(e);
      },
    );

  const progressBar = new SingleBar({}, Presets.shades_classic);
  progressBar.start(totalLineCount, 0);

  const progressInterval = setInterval(() => {
    progressBar.update(linesProcessed);

    if (ended) {
      clearInterval(progressInterval);
      progressBar.stop();
      console.log(`Output file ${outputFile} is ready.`);
    }
  }, 500);

  return true;
})();
