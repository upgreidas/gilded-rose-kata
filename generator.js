const cliProgress = require('cli-progress');
const fs = require('fs');
const { Readable } = require('stream');
const { resolve } = require('path');

const OUTPUT_FILENAME = process.argv[2] || 'generatedInput';
const MAX_ITEM_COUNT = parseInt(process.argv[3], 10) || 1000000;
const QUALITY_INTERVAL = [0, 50];
const SELLINS_INTERVAL = [-1, 10];
const ITEM_NAMES = [
  'Backstage passes to a TAFKAL80ETC concert',
  'Aged Brie',
  'Sulfuras, Hand of Ragnaros',
  'foo',
];

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateInputLine() {
  return `${ITEM_NAMES[random(0, 4)]}#${random(QUALITY_INTERVAL[0],
    QUALITY_INTERVAL[1])}#${random(SELLINS_INTERVAL[0], SELLINS_INTERVAL[1])}\n`;
}

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let count = 0;
let ended = false;

const inputGenerator = new Readable({
  read() {
    this.push(generateInputLine());

    count += 1;

    if (count === MAX_ITEM_COUNT) {
      this.push(null);
    }
  },
});

console.log('Generating input file...');

progressBar.start(MAX_ITEM_COUNT, 0);

const output = fs.createWriteStream(resolve(__dirname, 'data', OUTPUT_FILENAME));
output.on('close', () => {
  ended = true;
});

inputGenerator.pipe(output);

const progressInterval = setInterval(() => {
  progressBar.update(count);

  if (ended) {
    clearInterval(progressInterval);
    progressBar.stop();
  }
}, 500);
